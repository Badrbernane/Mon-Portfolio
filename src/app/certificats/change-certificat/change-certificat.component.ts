import { certificat } from './../../models/models';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'change-certificat',
  templateUrl: './change-certificat.component.html',
  styleUrl: './change-certificat.component.scss'
})
export class ChangeCertificatComponent {
  newcertificat: FormGroup;
  dataSource = new MatTableDataSource<any>();
  columns = [
    'id',
    'nom',
    'image',
    'source',
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
    this.newcertificat = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      source: ['', Validators.required],
      image: ['', Validators.required],
      datecreation: ['', Validators.required],
      datemodification: ['', Validators.required],
      idPersonnes: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.apiService.getAllcertificat().subscribe({
      next: (res: any[]) => {
        this.dataSource.data = res;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des expériences', err);
      }
    });
  }

  addnewcertificat(): void {
    if (this.newcertificat.invalid) {
      return;
    }

    const certificat = this.newcertificat.value;
    // Supprimer l'ID pour ignorer lors de l'ajout
    delete certificat.id;
    console.log('Données envoyées:', certificat);
    this.apiService.addnewcertificat(certificat).subscribe(
      (res: any) => {
        this.newcertificat.reset();
        this.newcertificat.patchValue({
          datecreation: new Date(),
          datemodification: new Date(),
        });

        this.dataSource.data = [res, ...this.dataSource.data];
        this.snackBar.open('certificat ajoutée avec succès', 'Fermer', { duration: 3000 });
        this.isAdding = false; // Passer en mode édition après ajout si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de certificat:', error);
        this.snackBar.open('Erreur lors de l\'ajout de certificat', 'Fermer', { duration: 3000 });
      }
    );
  }
  
  editcertificat(certificatToEdit: any): void {
    this.isEditing = true; // Activer le mode édition
     this.isAdding = false; // Désactiver le mode ajout
    this.newcertificat.patchValue({
      id: certificatToEdit.id,
      nom: certificatToEdit.nom,
      image: certificatToEdit.image,
      source: certificatToEdit.source,
      datecreation: certificatToEdit.datecreation,
      datemodification: certificatToEdit.datemodification,
      idPersonnes: certificatToEdit.idPersonnes,
    });
  }

  updatecertificat(): void {
    if (this.newcertificat.invalid) {
      return;
    }

    const updatedcertificat = this.newcertificat.value;
    this.apiService.updatecertificat(updatedcertificat.id, updatedcertificat).subscribe(
      (res: any) => {
        const index = this.dataSource.data.findIndex(exp => exp.id === updatedcertificat.id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedcertificat;
          this.dataSource._updateChangeSubscription(); // Déclenche la mise à jour de la table
        }

        this.snackBar.open('certif mise à jour avec succès', 'Fermer', { duration: 3000 });
        this.isEditing = false; // Désactiver le mode édition après mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de certif:', error);
        this.snackBar.open('Erreur lors de la mise à jour de certif', 'Fermer', { duration: 3000 });
      }
    );
  }

  deletecertificat(certificat: any): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Suppression de certif',
        message: 'Êtes-vous sûr de vouloir supprimer ce certif ?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.apiService.deletecertificat(certificat.id).subscribe(
          (res: string) => {
            this.snackBar.open(res, 'OK', { duration: 3000 });
            if (res === 'deleted') {
              this.dataSource.data = this.dataSource.data.filter(exp => exp.id !== certificat.id);
              this.dataSource._updateChangeSubscription(); // Déclenche la mise à jour de la table
            }
          },
          (error) => {
            console.error('Erreur lors de la suppression du certif:', error);
            this.snackBar.open('Erreur lors de la suppression du certif', 'Fermer', { duration: 3000 });
          }
        );
      }
    });
  }
}
