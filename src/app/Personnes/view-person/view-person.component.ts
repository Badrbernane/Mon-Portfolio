import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services/auth.service';

export interface TableElement {
  name: string;
  value: string;
}

@Component({
  selector: 'view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.scss'] // Assurez-vous que le nom est correct
})
export class ViewPersonComponent implements OnInit {
  columns: string[] = ['name', 'value'];
  dataSource: TableElement[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    const id = this.authService.getPersonneId(); // Récupérer l'ID de la personne connectée
    if(id){
      this.apiService.getpersonne(id).subscribe(
      personne => {
        if (personne) {
          // Vérifier que datecreation est bien une chaîne de caractères ou une date valide
          let dateCreation = personne.datecreation;
          if (typeof dateCreation === 'string') {
            dateCreation = new Date(dateCreation);
          } else if (!(dateCreation instanceof Date)) {
            console.error('Date creation is not a valid Date object or string');
            dateCreation = new Date(); // Fallback
          }

          this.dataSource = [
            { name: 'Name', value: `${personne.nom} ${personne.prenom}` },
            { name: 'Email', value: personne.gmail },
            { name: 'Phone', value: personne.numTelephone},
            { name: 'Created On', value: dateCreation.toLocaleDateString() },
            { name: 'Post', value: personne.titreposte}
          ];
        }
      },
      error => {
        console.error('Error fetching person data', error);
      }
    );
  }
}
}
