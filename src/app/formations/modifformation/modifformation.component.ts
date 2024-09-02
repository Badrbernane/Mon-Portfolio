import { formation } from './../../models/models';
import { ApiService } from './../../shared/services/api.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'modifformation',
  templateUrl: './modifformation.component.html',
  styleUrl: './modifformation.component.scss'
})
export class ModifformationComponent {
    newformation: FormGroup;
    dataSource = new MatTableDataSource<any>();
    columns = [
      'id',
      'titre',
      'datedebut',
      'ecole',
      'description',
      'idPersonnes',
      'delete',
    ];
    isEditing = false; // Variable pour suivre le mode édition
    isAdding = true; // Variable pour suivre le mode ajout
  

    constructor(
      fb: FormBuilder,
      private apiService: ApiService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
    )
    {
      this.newformation = fb.group({
        id: [''],
        titre: fb.control('',[Validators.required]),
        description: fb.control('',[Validators.required]),
        datedebut: fb.control('',[Validators.required]),
        datefin: fb.control('',[Validators.required]),
        ecole: fb.control('',[Validators.required]),
        date_creation: fb.control('',[Validators.required]),
        date_modification: fb.control('',[Validators.required]),
        idPersonnes: fb.control('',[Validators.required]),
        actuel:fb.control(false),
    });

    }

    ngOnInit(): void {
      this.apiService.getAllFormations().subscribe({
        next: (res: any[]) => {
          this.dataSource.data = res;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des expériences', err);
        }
      });
    }

    editFormation(formationToEdit: any): void {
      this.isEditing = true; // Activer le mode édition
       this.isAdding = false; // Désactiver le mode ajout
      this.newformation.patchValue({
        id: formationToEdit.id,
        titre: formationToEdit.titre,
        ecole: formationToEdit.ecole,
        description: formationToEdit.description,
        datedebut: formationToEdit.datedebut,
        datefin: formationToEdit.datefin,
        date_creation: formationToEdit.date_creation,
        date_modification: formationToEdit.date_modification,
        idPersonnes: formationToEdit.idPersonnes,
        actuel: formationToEdit.actuel,
      });
    }  

    updateFormation(): void {
      if (this.newformation.invalid) {
        return;
      }
  
      const updatedFormation = this.newformation.value;
      this.apiService.updateFormation(updatedFormation.id, updatedFormation).subscribe(
        (res: any) => {
          const index = this.dataSource.data.findIndex(form => form.id === updatedFormation.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedFormation;
            this.dataSource._updateChangeSubscription(); // Déclenche la mise à jour de la table
          }
  
          this.snackBar.open('Formation mise à jour avec succès', 'Fermer', { duration: 3000 });
          this.isEditing = false; // Désactiver le mode édition après mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'expérience:', error);
          this.snackBar.open('Erreur lors de la mise à jour de l\'expérience', 'Fermer', { duration: 3000 });
        }
      );
    }

    addnewformation(){
      let formation = {
        titre: this.newformation.get("titre")?.value,
        description: this.newformation.get("description")?.value,
        datedebut: this.newformation.get("datedebut")?.value,
        datefin: this.newformation.get("datefin")?.value,
        idPersonnes: this.newformation.get("idPersonnes")?.value,
        ecole: this.newformation.get("ecole")?.value,
        actuel: this.newformation.get("actuel")?.value,
        date_creation: this.newformation.get("datedebut")?.value,
        date_modification: this.newformation.get("datefin")?.value,
      };
      console.log('Données envoyées :', formation);
      this.apiService.addnewformation(formation).subscribe(
        (res: any) => {
          console.log('Réponse du backend :', res);
          // Vérification de la réponse du backend
        if (res) {
          this.dataSource.data = [res, ...this.dataSource.data];
          this.snackBar.open('Formation ajoutée avec succès', 'Fermer', { duration: 3000 });
          this.isAdding = false; // Passer en mode édition après ajout si nécessaire
        } else {
          console.warn('error 1')
          this.snackBar.open('Problème lors de l\'ajout de la formation', 'Fermer', { duration: 3000 });
        }
      },
      (error) => {
        console.warn('error 2')
        // Gestion des erreurs
        console.error('Erreur lors de l\'ajout de la formation:', error);
        this.snackBar.open('Erreur lors de l\'ajout de la formation', 'Fermer', { duration: 3000 });
      }
      );
    }

    deleteExistformation(formation: any): void {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Suppression de formation',
          message: 'Êtes-vous sûr de vouloir supprimer cette formation ?',
        },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.apiService.deleteExistformation(formation.id).subscribe(
            (res: string) => {
              this.snackBar.open(res, 'OK', { duration: 3000 });
              if (res === 'deleted') {
                this.dataSource.data = this.dataSource.data.filter(form => form.id !== formation.id);
                this.dataSource._updateChangeSubscription();// Déclenche la mise à jour de la table
                console.log('DataSource après mise à jour:', this.dataSource.data);
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

