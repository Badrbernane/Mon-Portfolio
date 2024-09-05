import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Langue } from '../../models/models';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { LangueNiveauDialogComponent } from '../langue-niveau-dialog/langue-niveau-dialog.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'change-langues',
  templateUrl: './change-langues.component.html',
  styleUrl: './change-langues.component.scss'
})
export class ChangeLanguesComponent implements OnInit {
  selectedLangueIds: number[] = [];
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly langues = signal<Langue[]>([]);
  readonly announcer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['idLangue', 'langueNom', 'niveau', 'personneNom', 'delete'];

  chipLangues: Langue[] = []; 
  selectedlangues: any[] = []; // Utilisez un type plus spécifique si possible
  niveaux: string[] = ['Débutant', 'Intermédiaire', 'Avancé'];  // Exemples de niveaux
  

  constructor(private dialog: MatDialog, private apiService: ApiService, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadLangues();
    const personneId = this.authService.getPersonneId(); // Récupère l'ID de la personne;  // Remplacez par l'ID de la personne concernée
    if(personneId)
    this.getLanguesByPersonneId(personneId);
  }

  loadLangues(): void {
    this.apiService.getAlllangue().subscribe((data: Langue[]) => {
      this.langues.set(data);
      this.chipLangues = [...data]; // Met à jour les compétences pour les chips
      this.selectedLangueIds = data.map(lang => lang.id);
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const existingLangue = this.langues().find(langu => langu.nom.toLowerCase() === value.toLowerCase());

      if (existingLangue) {
        this.announcer.announce(`Competence ${value} already exists`);
        console.log(`Langue "${value}" already exists.`);
        this.selectedLangueIds.push(existingLangue.id);
      } else {
        const newLangue: any = {
          id: 0,
          nom: value,
          date_creation: new Date(),
          date_modification: new Date(),
        };

        delete newLangue.id;

        this.apiService.addnewLangue(newLangue).subscribe((addedLangue: Langue) => {
          this.langues.update(langues => [...langues, addedLangue]);
          this.chipLangues.push(addedLangue);  // Met à jour les compétences pour les chips
          this.selectedLangueIds.push(addedLangue.id);
        }, error => {
          console.error('Error adding new langue:', error);
        });

        this.announcer.announce(`Added ${value}`);
      }
    }
  }

  remove(langu: Langue): void {
    this.langues.update(langues => {
      const index = langues.indexOf(langu);
      if (index >= 0) {
        langues.splice(index, 1);
        this.selectedLangueIds = this.selectedLangueIds.filter(id => id !== langu.id);
        this.chipLangues = this.chipLangues.filter(lang => lang.id !== langu.id); // Met à jour les compétences pour les chips
        this.announcer.announce(`Removed ${langu.nom}`);
        return [...langues];
      }
      return langues;
    });
  }

  edit(langu: Langue, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(langu);
      return;
    }

    this.langues.update(langues => {
      const index = langues.indexOf(langu);
      if (index >= 0) {
        langues[index] = {
          ...langu,
          nom: value,
          datemodification: new Date(),
        };
        this.chipLangues = this.chipLangues.map(comp =>
          langu.id === langu.id ? { ...comp, nom: value, datemodification: new Date() } : langu
        ); // Met à jour les compétences pour les chips
        return [...langues];
      }
      return langues;
    });
  }

  trackByLangue(index: number, langu: Langue): number {
    return langu.id;
  }

  validateLangues(): void {
    
    const selectedLangues = this.chipLangues.filter(langue => this.selectedLangueIds.includes(langue.id));

    const dialogRef = this.dialog.open(LangueNiveauDialogComponent, {
      width: '700px',
      data: selectedLangues
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && Array.isArray(result)) {
        

      // Filtrer les champs inutiles
      const languesToSend = result.map(langue => ({
          // Vous pouvez changer cet ID si besoin
          langueId: langue.id,
          niveau: langue.niveau
      }));
      console.log('Langues à envoyer:', languesToSend); // Ajouté pour débogage
      
      const personneId = this.authService.getPersonneId();
      if(personneId)
        // Appeler l'API pour enregistrer les langues et leurs niveaux
        this.apiService.addLanguesToPerssLang(personneId, languesToSend).subscribe(
          response => {
            this.snackBar.open('Langues ajoutées avec succès', 'Fermer', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.getLanguesByPersonneId(personneId);
          },
          error => {
            this.snackBar.open('Erreur lors de l\'ajout des compétences.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        );
      }
    });
  }
  
  getLanguesByPersonneId(personneId: number): void {
    this.apiService.getLanguesByPersonneId(personneId).subscribe(
      (data: any[]) => {
        this.selectedlangues = data.map(item => ({
          personneNom: item.personneNom,
          langueNom: item.langueNom,
          niveau: item.niveau,
          idLangue: item.idLangue
        }));
        console.log('Selected Competences:', this.selectedlangues);
      },
      error => {
        console.error('Error fetching competences:', error);
      }
    );
  }


  deleteLangueByPersonneIdAndLangueId(LangueId: number): void {
    const personneId = this.authService.getPersonneId();
    if(personneId)
    this.apiService.deleteLangueByPersonneIdAndLangueId(personneId, LangueId).subscribe(
      () => {
        const index = this.langues().findIndex(lang => lang.id === LangueId);
        if (index >= 0) {
          this.langues.update(langues => {
            langues.splice(index, 1);
            this.selectedLangueIds = this.selectedLangueIds.filter(id => id !== LangueId);
            this.chipLangues = this.chipLangues.filter(lang => lang.id !== LangueId);
            return [...langues];
          });
        }
        this.getLanguesByPersonneId(personneId);
        this.snackBar.open('Compétence supprimée avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.announcer.announce('Compétence supprimée avec succès');
      },
      error => {
        this.snackBar.open('Erreur lors de la suppression de la compétence.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.announcer.announce('Erreur lors de la suppression de la compétence.');
        console.error('Erreur lors de la suppression de la compétence:', error);
      }
    );
  }
  
}
