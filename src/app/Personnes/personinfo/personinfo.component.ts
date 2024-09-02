import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';
import { Personne } from './../../models/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'personinfo',
  templateUrl: './personinfo.component.html',
  styleUrl: './personinfo.component.scss'
})
export class PersoninfoComponent implements OnInit {
  personne: Personne = {
    id: 0, // ou un autre type approprié
    nom: '',
    prenom: '',
    gmail: '',
    age: 0,
    codepostal: '',
    permis: '',
    titreposte: '',
    lienfacebook: '',
    lienlinkdin: '',
    lieninstagram: '',
    lientwitter: '',
    photo: '',
    description: '',
    motdepasse: '',
    cv: '',
    nombredexperience: 0,
    datecreation: null,
    datemodification: null,
    numTelephone: ''
  };
    errorMessage: string = '';

  constructor(private apiservice: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    const id = this.authService.getPersonneId(); // Récupérer l'ID de la personne connectée
    if (id) {
      this.apiservice.getpersonne(id).subscribe({
        next: (data: Personne) => this.personne = data,
        error: (error) => this.errorMessage = 'Une erreur est survenue : ' + error.message
      });
    } else {
      this.errorMessage = 'Aucun ID trouvé pour la personne connectée';
    }
    
  }
}
