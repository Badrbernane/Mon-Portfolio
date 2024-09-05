import { AuthService } from './../../shared/services/auth.service';
import { Component } from '@angular/core';
import { Interet } from '../../models/models';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'view-interets',
  templateUrl: './view-interets.component.html',
  styleUrl: './view-interets.component.scss'
})
export class ViewInteretsComponent {
  selectedInterets: Interet[] = [];  // Correction ici
  Interets: Interet[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private authService: AuthService){}

  ngOnInit(): void {
    const id = this.authService.getPersonneId(); // Récupère l'ID de la personne;  // Remplacez par l'ID de la personne concernée
    if(id)
  this.apiService.getInteretsByPersonneId(id).subscribe(
    (data: any[]) => {
      console.log('API Response:', data);  // Debugging ici
      this.selectedInterets = data;
      this.Interets = data;
    },
    error => {
      console.error('Error fetching interets:', error);
      this.snackBar.open('Error fetching interets', 'Close', {
        duration: 3000
      });
    }
  );
  }
trackByInteret(index: number, intere: Interet): number {
  return intere.id;  // Correction ici, pour correspondre à l'interface
}
}
