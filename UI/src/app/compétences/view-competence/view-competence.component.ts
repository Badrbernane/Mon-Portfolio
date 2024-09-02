import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';

export interface competence {
date_creation: any;
  idCompetence: number;
  competenceNom: string;
  personneNom: string;
}

@Component({
  selector: 'view-competence',
  templateUrl: './view-competence.component.html',
  styleUrl: './view-competence.component.scss'
})
export class ViewCompetenceComponent {
  
  selectedCompetences: competence[] = [];  // Correction ici
  competences: competence[] = [];
  

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private authService: AuthService){}

  ngOnInit(): void {
  const id = this.authService.getPersonneId();
  if(id)
  this.apiService.getCompetencesByPersonneId(id).subscribe(
    (data: any[]) => {
      console.log('API Response:', data);  // Debugging ici
      this.selectedCompetences = data;
      this.competences = data;
    },
    error => {
      console.error('Error fetching competences:', error);
      this.snackBar.open('Error fetching competences', 'Close', {
        duration: 3000
      });
    }
  );
  }
trackByCompetence(index: number, compet: competence): number {
  return compet.idCompetence;  // Correction ici, pour correspondre à l'interface
}
}