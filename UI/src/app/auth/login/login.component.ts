import { ApiService } from './../../shared/services/api.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;
    hidePassword: boolean = true;
    errorMessage: string | null = null; // Définir errorMessage ici

    constructor(fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar, private router: Router, private authService: AuthService){
      this.loginForm = fb.group({
        gmail:fb.control('', [Validators.required]),
        motdepasse:fb.control('', [Validators.required]),
    });
}
  login(){
    let Personne = {
      gmail: this.loginForm.get('gmail')?.value,
      motdepasse: this.loginForm.get('motdepasse')?.value,
    };
    this.apiService.login(Personne).subscribe((res:any) => {
      if(res.result) {
        alert("login success");
        this.authService.login(res.token, res.personneId); // stocker le token et l'ID
        this.router.navigateByUrl("/profile")
      } else {
        console.warn('error 1')
        alert("chi haja ma hiyach");

        this.errorMessage = "Vérifiez vos données";
      }
    },
  );
  }

}
