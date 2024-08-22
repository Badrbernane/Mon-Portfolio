import { ApiService } from './../../shared/services/api.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;
    hidePassword: boolean = true;
    errorMessage: string | null = null; // Définir errorMessage ici
    private loggedIN = false;

    constructor(fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar, private router: Router){
      this.loginForm = fb.group({
        gmail:fb.control('', [Validators.required]),
        mot_de_passe:fb.control('', [Validators.required]),
    });
}
  login(){
    let Personne = {
      gmail: this.loginForm.get('gmail')?.value,
      mot_de_passe: this.loginForm.get('mot_de_passe')?.value,
    };
    this.apiService.login(Personne).subscribe((res:any) => {
      if(res.result) {
        alert("login success");
        localStorage.setItem("angular18Login", JSON.stringify(Personne));
        this.router.navigateByUrl("/home")
      } else {
        console.warn('error 1')
        alert("chi haja ma hiyach");

        this.errorMessage = "Vérifiez vos données";
      }
    },
  );
  }

}
