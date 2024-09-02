import { competence } from './../../models/models';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'change-competence',
  templateUrl: './change-competence.component.html',
  styleUrls: ['./change-competence.component.scss'],
})
export class ChangeCompetenceComponent implements OnInit {
  selectedCompetenceIds: number[] = [];
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly competences = signal<competence[]>([]);
  readonly announcer = inject(LiveAnnouncer);
  displayedColumns: string[] = ['idCompetence', 'competenceNom', 'personneNom', 'delete'];

  chipCompetences: competence[] = []; 
  selectedCompetences: any[] = []; // Utilisez un type plus spécifique si possible
  
  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCompetences();
    this.getCompetencesByPersonneId(1048);  // Remplacez par l'ID de la personne concernée
  }

  loadCompetences(): void {
    this.apiService.getAllcompetence().subscribe((data: competence[]) => {
      this.competences.set(data);
      this.chipCompetences = [...data]; // Met à jour les compétences pour les chips
      this.selectedCompetenceIds = data.map(comp => comp.id);
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const existingCompetence = this.competences().find(comp => comp.nom.toLowerCase() === value.toLowerCase());

      if (existingCompetence) {
        this.announcer.announce(`Competence ${value} already exists`);
        console.log(`Competence "${value}" already exists.`);
        this.selectedCompetenceIds.push(existingCompetence.id);
      } else {
        const newCompetence: any = {
          id: 0,
          nom: value,
          datecreation: new Date(),
          datemodification: new Date(),
        };

        delete newCompetence.id;

        this.apiService.addnewcompetence(newCompetence).subscribe((addedCompetence: competence) => {
          this.competences.update(competences => [...competences, addedCompetence]);
          this.chipCompetences.push(addedCompetence);  // Met à jour les compétences pour les chips
          this.selectedCompetenceIds.push(addedCompetence.id);
        }, error => {
          console.error('Error adding new competence:', error);
        });

        this.announcer.announce(`Added ${value}`);
      }
    }

    event.chipInput!.clear();
  }

  remove(compet: competence): void {
    this.competences.update(competences => {
      const index = competences.indexOf(compet);
      if (index >= 0) {
        competences.splice(index, 1);
        this.selectedCompetenceIds = this.selectedCompetenceIds.filter(id => id !== compet.id);
        this.chipCompetences = this.chipCompetences.filter(comp => comp.id !== compet.id); // Met à jour les compétences pour les chips
        this.announcer.announce(`Removed ${compet.nom}`);
        return [...competences];
      }
      return competences;
    });
  }

  edit(compet: competence, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(compet);
      return;
    }

    this.competences.update(competences => {
      const index = competences.indexOf(compet);
      if (index >= 0) {
        competences[index] = {
          ...compet,
          nom: value,
          datemodification: new Date(),
        };
        this.chipCompetences = this.chipCompetences.map(comp =>
          comp.id === compet.id ? { ...comp, nom: value, datemodification: new Date() } : comp
        ); // Met à jour les compétences pour les chips
        return [...competences];
      }
      return competences;
    });
  }

  trackByCompetence(index: number, compet: competence): number {
    return compet.id;
  }

  validateCompetences(): void {
    const personneId = 1048;  // Remplacez par l'ID de la personne concernée

    if (this.selectedCompetenceIds.length > 0) {
      this.apiService.addCompetencesToPerssComp(personneId, this.selectedCompetenceIds)
        .subscribe(response => {
          if (typeof response === 'string') {
            if (response.includes('Compétences ajoutées avec succès')) {
              this.snackBar.open('Compétences ajoutées avec succès', 'Fermer', {
                duration: 3000,
                panelClass: ['success-snackbar']
              });
              this.announcer.announce('Compétences ajoutées avec succès');
              console.log('Compétences ajoutées avec succès:', response);
              this.selectedCompetenceIds = [];
              this.loadCompetences();  // Recharge toutes les compétences
              // Recharge les compétences après suppression
              this.getCompetencesByPersonneId(personneId);  // Recharge les compétences depuis la base de données
              this.cdr.detectChanges(); // Forcer la détection des changements
            } else {
              this.snackBar.open('Erreur lors de l\'ajout des compétences.', 'Fermer', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
              this.announcer.announce('Erreur lors de l\'ajout des compétences.');
              console.error('Erreur lors de l\'ajout des compétences:', response);
            }
          } else {
            this.snackBar.open('Erreur lors de l\'ajout des compétences.', 'Fermer', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
            this.announcer.announce('Erreur lors de l\'ajout des compétences.');
            console.error('Erreur lors de l\'ajout des compétences:', response);
          }
        }, error => {
          this.snackBar.open('Erreur lors de l\'ajout des compétences.', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.log('Erreur complète:', error);
          this.announcer.announce('Erreur lors de l\'ajout des compétences.');
          console.error('Erreur lors de l\'ajout des compétences:', error);
        });
    } else {
      console.log('Aucune compétence sélectionnée.');
    }
  }

  getCompetencesByPersonneId(personneId: number): void {
    this.apiService.getCompetencesByPersonneId(personneId).subscribe(
      (data: any[]) => {
        this.selectedCompetences = data.map(item => ({
          personneNom: item.personneNom,
          competenceNom: item.competenceNom,
          idCompetence: item.idCompetence
        }));
        console.log('Selected Competences:', this.selectedCompetences);
      },
      error => {
        console.error('Error fetching competences:', error);
      }
    );
  }

  deleteCompetenceByPersonneIdAndCompetenceId(competenceId: number): void {
    const personneId = 1048;
    this.apiService.deleteCompetenceByPersonneIdAndCompetenceId(personneId, competenceId).subscribe(
      () => {
        const index = this.competences().findIndex(comp => comp.id === competenceId);
        if (index >= 0) {
          this.competences.update(competences => {
            competences.splice(index, 1);
            this.selectedCompetenceIds = this.selectedCompetenceIds.filter(id => id !== competenceId);
            this.chipCompetences = this.chipCompetences.filter(comp => comp.id !== competenceId);
            return [...competences];
          });
        }
        this.getCompetencesByPersonneId(personneId);
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
