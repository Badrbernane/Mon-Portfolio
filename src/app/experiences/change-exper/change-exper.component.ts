import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'change-exper',
  templateUrl: './change-exper.component.html',
  styleUrls: ['./change-exper.component.scss']
})
export class ChangeExperComponent implements OnInit {
  newexperience: FormGroup;
  dataSource = new MatTableDataSource<any>();
  columns = [
    'id',
    'entreprise',
    'datedebut',
    'datefin',
    'remarque',
    'datecreation',
    'datemodification',
    'idPersonnes',
    'delete',
  ];
  isEditing = false; // Variable pour suivre le mode édition
  isAdding = true; // Variable pour suivre le mode ajout

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.newexperience = this.fb.group({
      id: [''],
      entreprise: ['', Validators.required],
      remarque: ['', Validators.required],
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required],
      datecreation: ['', Validators.required],
      datemodification: ['', Validators.required],
      idPersonnes: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getAllExperiences().subscribe({
      next: (res: any[]) => {
        this.dataSource.data = res;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des expériences', err);
      }
    });
  }

  addnewexperience(): void {
    if (this.newexperience.invalid) {
      return;
    }

    const experience = this.newexperience.value;
    // Supprimer l'ID pour ignorer lors de l'ajout
    delete experience.id;
    console.log('Données envoyées:', experience);
    this.apiService.addnewexperience(experience).subscribe(
      (res: any) => {
        this.newexperience.reset();
        this.newexperience.patchValue({
          datecreation: new Date(),
          datemodification: new Date(),
        });

        this.dataSource.data = [res, ...this.dataSource.data];
        this.snackBar.open('Experience ajoutée avec succès', 'Fermer', { duration: 3000 });
        this.isAdding = false; // Passer en mode édition après ajout si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout d\'expérience:', error);
        this.snackBar.open('Erreur lors de l\'ajout d\'expérience', 'Fermer', { duration: 3000 });
      }
    );
  }

  editExperience(experienceToEdit: any): void {
    this.isEditing = true; // Activer le mode édition
     this.isAdding = false; // Désactiver le mode ajout
    this.newexperience.patchValue({
      id: experienceToEdit.id,
      entreprise: experienceToEdit.entreprise,
      remarque: experienceToEdit.remarque,
      datedebut: experienceToEdit.datedebut,
      datefin: experienceToEdit.datefin,
      datecreation: experienceToEdit.datecreation,
      datemodification: experienceToEdit.datemodification,
      idPersonnes: experienceToEdit.idPersonnes,
    });
  }

  updateExperience(): void {
    if (this.newexperience.invalid) {
      return;
    }

    const updatedExperience = this.newexperience.value;
    this.apiService.updateExperience(updatedExperience.id, updatedExperience).subscribe(
      (res: any) => {
        const index = this.dataSource.data.findIndex(exp => exp.id === updatedExperience.id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedExperience;
          this.dataSource._updateChangeSubscription(); // Déclenche la mise à jour de la table
        }

        this.snackBar.open('Experience mise à jour avec succès', 'Fermer', { duration: 3000 });
        this.isEditing = false; // Désactiver le mode édition après mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'expérience:', error);
        this.snackBar.open('Erreur lors de la mise à jour de l\'expérience', 'Fermer', { duration: 3000 });
      }
    );
  }

  deleteExperience(experience: any): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Suppression d\'expérience',
        message: 'Êtes-vous sûr de vouloir supprimer cette expérience ?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.apiService.deleteExperience(experience.id).subscribe(
          (res: string) => {
            this.snackBar.open(res, 'OK', { duration: 3000 });
            if (res === 'deleted') {
              this.dataSource.data = this.dataSource.data.filter(exp => exp.id !== experience.id);
              this.dataSource._updateChangeSubscription(); // Déclenche la mise à jour de la table
            }
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'expérience:', error);
            this.snackBar.open('Erreur lors de la suppression de l\'expérience', 'Fermer', { duration: 3000 });
          }
        );
      }
    });
  }
}
