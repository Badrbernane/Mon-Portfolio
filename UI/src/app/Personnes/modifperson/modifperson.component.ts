import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { Personne } from '../../models/models';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'modifperson',
  templateUrl: './modifperson.component.html',
  styleUrls: ['./modifperson.component.scss']
})
export class ModifpersonComponent implements OnInit {
  newpersonne: FormGroup;
  errorMessage: string = '';
  personne: Personne | null = null; // To store the person

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.newpersonne = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: ['', Validators.required],
      codepostal: ['', Validators.required],
      gmail: ['', [Validators.required, Validators.email]], // Added email validation
      permis: ['', Validators.required],
      description: ['', Validators.required],
      cv: ['', Validators.required],
      titreposte: ['', Validators.required],
      photo: ['', Validators.required],
      lienfacebook: ['', Validators.required],
      lienlinkdin: ['', Validators.required],
      lieninstagram: ['', Validators.required],
      lientwitter: ['', Validators.required],
      nombredexperience: ['', Validators.required],
      numTelephone: ['', Validators.required],
      motdepasse: ['', Validators.required],
      datecreation: ['', Validators.required],
      datemodification:['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPersonne();
  }

  loadPersonne(): void {
    const id = this.authService.getPersonneId();
    if(id){ // Retrieve the ID of the connected person
      console.log('ID of the person retrieved:', id);
      this.apiService.getpersonne(id).subscribe({
        next: (data: Personne) => {
          this.personne = data;
          console.log('Data received from API:', data);
          this.newpersonne.patchValue({
            id: this.personne.id,
            nom: this.personne.nom,
            prenom: this.personne.prenom,
            age: this.personne.age,
            codepostal: this.personne.codepostal,
            gmail: this.personne.gmail,
            permis: this.personne.permis,
            description: this.personne.description,
            cv: this.personne.cv,
            titreposte: this.personne.titreposte,
            photo: this.personne.photo,
            lienfacebook: this.personne.lienfacebook,
            lienlinkdin: this.personne.lienlinkdin,
            lieninstagram: this.personne.lieninstagram,
            lientwitter: this.personne.lientwitter,
            nombredexperience: this.personne.nombredexperience,
            numTelephone: this.personne.numTelephone,
            motdepasse: this.personne.motdepasse,
            datecreation: this.personne.datecreation,
            datemodification: new Date(), // Set the current date for modification
          });
        },
        error: (error) => this.errorMessage = 'An error occurred: ' + error.message
      });
    }
  }

  onSubmit(): void {
    if (this.newpersonne.valid) {
      const id = this.newpersonne.get('id')?.value;
      const updatedPersonne = {
        ...this.newpersonne.value,
        motdepasse: this.personne?.motdepasse, // Retain the old password
        datecreation: this.personne?.datecreation, // Retain the creation date
        datemodification: new Date() // Current date for modification
      };

      console.log('Data sent for update:', updatedPersonne);

      this.apiService.updatePersonne(id, updatedPersonne).subscribe({
        next: (data) => {
          console.log('Person updated successfully:', data);
          // Add a notification or redirect after the update here
        },
        error: (error) => this.errorMessage = 'An error occurred during the update: ' + error.message
      });
    } else {
      this.errorMessage = 'Please correct the errors in the form.';
    }
  }

  editPersonne(): void {
    if (this.personne) {
      this.newpersonne.patchValue({
        id: this.personne.id,
        nom: this.personne.nom,
        prenom: this.personne.prenom,
        age: this.personne.age,
        codepostal: this.personne.codepostal,
        gmail: this.personne.gmail,
        permis: this.personne.permis,
        description: this.personne.description,
        cv: this.personne.cv,
        titreposte: this.personne.titreposte,
        photo: this.personne.photo,
        lienfacebook: this.personne.lienfacebook,
        lienlinkdin: this.personne.lienlinkdin,
        lieninstagram: this.personne.lieninstagram,
        lientwitter: this.personne.lientwitter,
        nombredexperience: this.personne.nombredexperience,
        numTelephone: this.personne.numTelephone,
        motdepasse: this.personne.motdepasse,
        datecreation: this.personne.datecreation, // Retain the existing creation date
        datemodification: new Date(), // Set the current date for modification
      });
    }
  }
}
