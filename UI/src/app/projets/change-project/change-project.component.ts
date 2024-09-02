import { projet } from './../../models/models';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'change-project',
  templateUrl: './change-project.component.html',
  styleUrl: './change-project.component.scss'
})
export class ChangeProjectComponent {
  newprojet: FormGroup;
  dataSource = new MatTableDataSource<any>();
  columns = [
    'id',
    'titre',
    'dateprojet',
    'lien',
    'client',
    'photo',
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
  ){
    this.newprojet = this.fb.group({
      id: [''],
      titre: ['', Validators.required],
      remarque: ['', Validators.required],
      dateprojet: ['', Validators.required],
      lien: ['', Validators.required],
      photo: ['', Validators.required],
      client: ['', Validators.required],
      datecreation: ['', Validators.required],
      datemodification: ['', Validators.required],
      idPersonnes: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getAllprojets().subscribe({
      next: (res: any[]) => {
        this.dataSource.data = res;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des expériences', err);
      }
    });
  }

  addnewprojet(): void {
    if (this.newprojet.invalid) {
      return;
    }

    const projet = this.newprojet.value;
    // Supprimer l'ID pour ignorer lors de l'ajout
    delete projet.id;
    console.log('Données envoyées:', projet);
    this.apiService.addnewprojet(projet).subscribe(
      (res: any) => {
        this.newprojet.reset();
        this.newprojet.patchValue({
          datecreation: new Date(),
          datemodification: new Date(),
        });

        this.dataSource.data = [res, ...this.dataSource.data];
        this.snackBar.open('projet ajoutée avec succès', 'Fermer', { duration: 3000 });
        this.isAdding = false; // Passer en mode édition après ajout si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de projet:', error);
        this.snackBar.open('Erreur lors de l\'ajout de projet', 'Fermer', { duration: 3000 });
      }
    );
  }

  editProjet(projetToEdit: any): void {
    this.isEditing = true; // Activer le mode édition
     this.isAdding = false; // Désactiver le mode ajout
    this.newprojet.patchValue({
      id: projetToEdit.id,
      titre: projetToEdit.titre,
      remarque: projetToEdit.remarque,
      dateprojet: projetToEdit.dateprojet,
      lien: projetToEdit.lien,
      photo: projetToEdit.photo,
      client: projetToEdit.client,
      datecreation: projetToEdit.datecreation,
      datemodification: projetToEdit.datemodification,
      idPersonnes: projetToEdit.idPersonnes,
    });
  }

  updateprojet(): void {
    if (this.newprojet.invalid) {
      return;
    }

    const updatedprojet = this.newprojet.value;
    this.apiService.updateprojet(updatedprojet.id, updatedprojet).subscribe(
      (res: any) => {
        const index = this.dataSource.data.findIndex(exp => exp.id === updatedprojet.id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedprojet;
          this.dataSource._updateChangeSubscription(); // Déclenche la mise à jour de la table
        }

        this.snackBar.open('projet mise à jour avec succès', 'Fermer', { duration: 3000 });
        this.isEditing = false; // Désactiver le mode édition après mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de projet:', error);
        this.snackBar.open('Erreur lors de la mise à jour de projet', 'Fermer', { duration: 3000 });
      }
    );
  }

  deleteprojet(projet: any): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Suppression de projet',
        message: 'Êtes-vous sûr de vouloir supprimer ce projet ?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.apiService.deleteprojet(projet.id).subscribe(
          (res: string) => {
            this.snackBar.open(res, 'OK', { duration: 3000 });
            if (res === 'deleted') {
              this.dataSource.data = this.dataSource.data.filter(exp => exp.id !== projet.id);
              this.dataSource._updateChangeSubscription(); // Déclenche la mise à jour de la table
            }
          },
          (error) => {
            console.error('Erreur lors de la suppression de projet:', error);
            this.snackBar.open('Erreur lors de la suppression de projet', 'Fermer', { duration: 3000 });
          }
        );
      }
    });
  }
}
