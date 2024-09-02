import { Interet } from './../../models/models';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'change-interets',
  templateUrl: './change-interets.component.html',
  styleUrl: './change-interets.component.scss'
})
export class ChangeInteretsComponent {
  selectedInteretsIds: number[] = [];
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly Interets = signal<Interet[]>([]);
  readonly announcer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['IdInteret', 'interetNom', 'personneNom', 'delete'];

  chipInterets: Interet[] = []; 
  selectedInterets: any[] = []; // Utilisez un type plus spécifique si possible
  
  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadInterets();
    this.getInteretsByPersonneId(1048);
  }

  loadInterets(): void {
    this.apiService.getAllinteret().subscribe((data: Interet[]) => {
      this.Interets.set(data);
      this.chipInterets = [...data]; // Met à jour les compétences pour les chips
      this.selectedInteretsIds = data.map(inter => inter.id);
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const existingInteret = this.Interets().find(inter => inter.nom.toLowerCase() === value.toLowerCase());

      if (existingInteret) {
        this.announcer.announce(`Interet ${value} already exists`);
        console.log(`Interet "${value}" already exists.`);
        this.selectedInteretsIds.push(existingInteret.id);
      } else {
        const newInteret: any = {
          id: 0,
          nom: value,
          datecreation: new Date(),
          datemodification: new Date(),
        };

        delete newInteret.id;

        this.apiService.addnewinteret(newInteret).subscribe((addedInteret: Interet) => {
          this.Interets.update(Interets => [...Interets, addedInteret]);
          this.chipInterets.push(addedInteret);  // Met à jour les compétences pour les chips
          this.selectedInteretsIds.push(addedInteret.id);
        }, error => {
          console.error('Error adding new Interet:', error);
        });

        this.announcer.announce(`Added ${value}`);
      }
    }

    event.chipInput!.clear();
  }

  remove(intere: Interet): void {
    this.Interets.update(Interets => {
      const index = Interets.indexOf(intere);
      if (index >= 0) {
        Interets.splice(index, 1);
        this.selectedInteretsIds = this.selectedInteretsIds.filter(id => id !== intere.id);
        this.chipInterets = this.chipInterets.filter(inter => inter.id !== intere.id); // Met à jour les compétences pour les chips
        this.announcer.announce(`Removed ${intere.nom}`);
        return [...Interets];
      }
      return Interets;
    });
  }

  edit(intere: Interet, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(intere);
      return;
    }

    this.Interets.update(Interets => {
      const index = Interets.indexOf(intere);
      if (index >= 0) {
        Interets[index] = {
          ...intere,
          nom: value,
          datemodification: new Date(),
        };
        this.chipInterets = this.chipInterets.map(inter =>
          inter.id === intere.id ? { ...inter, nom: value, datemodification: new Date() } : inter
        ); // Met à jour les compétences pour les chips
        return [...Interets];
      }
      return Interets;
    });
  }

  trackByInteret(index: number, intere: Interet): number {
    return intere.id;
  }

  validateInterets(): void {
    const personneId = 1048;  // Remplacez par l'ID de la personne concernée

    if (this.selectedInteretsIds.length > 0) {
      this.apiService.addInteretsToPerssInter(personneId, this.selectedInteretsIds)
        .subscribe(response => {
          if (typeof response === 'string') {
            if (response.includes('interet ajoutées avec succès')) {
              this.snackBar.open('interets ajoutées avec succès', 'Fermer', {
                duration: 3000,
                panelClass: ['success-snackbar']
              });
              this.announcer.announce('interets ajoutées avec succès');
              console.log('interets ajoutées avec succès:', response);
              this.selectedInteretsIds = [];
              this.loadInterets();  // Recharge toutes les compétences
              // Recharge les compétences après suppression
              this.getInteretsByPersonneId(personneId);  // Recharge les compétences depuis la base de données
              this.cdr.detectChanges(); // Forcer la détection des changements
            } else {
              this.snackBar.open('Erreur lors de l\'ajout des interets.', 'Fermer', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
              this.announcer.announce('Erreur lors de l\'ajout des interets.');
              console.error('Erreur lors de l\'ajout des interets:', response);
            }
          } else {
            this.snackBar.open('Erreur lors de l\'ajout des interets.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
            this.announcer.announce('Erreur lors de l\'ajout des interts.');
            console.error('Erreur lors de l\'ajout des interets:', response);
          }
        }, error => {
          this.snackBar.open('Erreur lors de l\'ajout des interets.', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.log('Erreur complète:', error);
          this.announcer.announce('Erreur lors de l\'ajout des interts.');
          console.error('Erreur lors de l\'ajout des interets:', error);
        });
    } else {
      console.log('Aucune interet sélectionnée.');
    }
  }

  getInteretsByPersonneId(personneId: number): void {
    this.apiService.getInteretsByPersonneId(personneId).subscribe(
      (data: any[]) => {
        this.selectedInterets = data.map(item => ({
          personneNom: item.personneNom,
          interetNom: item.centreInteretNom,
          IdInteret: item.idCentreInteret
        }));
        console.log('Selected Interets:', this.selectedInterets);
      },
      error => {
        console.error('Error fetching Interets:', error);
      }
    );
  }

  deleteInteretByPersonneIdAndInteretId(IdInteret: number): void {
    const personneId = 1048;
    this.apiService.deleteInteretByPersonneIdAndInteretId(personneId, IdInteret).subscribe(
      () => {
        const index = this.Interets().findIndex(inter => inter.id === IdInteret);
        if (index >= 0) {
          this.Interets.update(Interets => {
            Interets.splice(index, 1);
            this.selectedInteretsIds = this.selectedInteretsIds.filter(id => id !== IdInteret);
            this.chipInterets = this.chipInterets.filter(inter => inter.id !== IdInteret);
            return [...Interets];
          });
        }
        this.getInteretsByPersonneId(personneId);
        this.snackBar.open('Interet supprimée avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.announcer.announce('Interet supprimée avec succès');
      },
      error => {
        this.snackBar.open('Erreur lors de la suppression de interet.', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.announcer.announce('Erreur lors de la suppression de interet.');
        console.error('Erreur lors de la suppression de interet:', error);
      }
    );
  }
}
