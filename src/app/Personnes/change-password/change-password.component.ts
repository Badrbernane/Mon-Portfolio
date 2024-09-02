import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'] // Corrigé ici
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      id: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  // Validation pour vérifier si les mots de passe correspondent
  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    return form.get('newPassword')?.value === form.get('confirmNewPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { id, oldPassword, newPassword, confirmNewPassword } = this.changePasswordForm.value;
      this.apiService.changePassword(id, oldPassword, newPassword, confirmNewPassword).subscribe(
        response => {
          this.snackBar.open('Mot de passe changé avec succès !', 'Fermer', {
            duration: 3000, // Durée en millisecondes
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'] // Classe CSS personnalisée pour le succès
          });
          this.snackBar.open('Erreur lors du changement de mot de passe.', 'Fermer', {
            duration: 3000, // Durée en millisecondes
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'] // Classe CSS personnalisée pour les erreurs
          });
          console.log('Password changed successfully', response);
          // Ajoutez un message de succès ou redirigez l'utilisateur
        },
        error => {
          console.error('chi haja mn ldakhl oldpassword ghalt', error);
          // Ajoutez un message d'erreur
        }
      );
    }
  }
}