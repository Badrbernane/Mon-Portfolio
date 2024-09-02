import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Langue } from '../../models/models';

@Component({
  selector: 'langue-niveau-dialog',
  templateUrl: './langue-niveau-dialog.component.html',
  styleUrl: './langue-niveau-dialog.component.scss',
})
export class LangueNiveauDialogComponent {
  niveaux = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

  constructor(
    public dialogRef: MatDialogRef<LangueNiveauDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Langue[]
  ) {}

  onNiveauChange(niveau: string, index: number): void {
    this.data[index].niveau = niveau;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
