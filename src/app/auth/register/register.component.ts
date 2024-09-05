import { ApiService } from './../../shared/services/api.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Correction ici
})
export class RegisterComponent {
  hidePwdContent: boolean = true;
  registerForm: FormGroup;

  constructor(private fb:FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar) { // Utilisation correcte de l'injection de dépendance
    this.registerForm = fb.group({
      nom: fb.control('', [Validators.required]),
      prenom: fb.control('', [Validators.required]),
      gmail: fb.control('', [Validators.required]),
      numTelephone: fb.control('', [Validators.required]),
      motdepasse: fb.control('', [Validators.required]),
      motdepasseconfirmation: fb.control('', [Validators.required]),
    });
  }

  register(){
    let Personne = {
      nom: this.registerForm.get("nom")?.value,
      prenom: this.registerForm.get("prenom")?.value,
      gmail: this.registerForm.get("gmail")?.value,
      numTelephone: this.registerForm.get("numTelephone")?.value,
      motdepasse: this.registerForm.get("motdepasse")?.value,
      motdepasseconfirmation: this.registerForm.get("motdepasseconfirmation")?.value,
    };

    this.apiService.register(Personne).subscribe(
      (res: any) => {
        if(res.result) {
          alert("Registration success");
        } else {
          alert("probleme");
        }
      },
    );
  }
}
