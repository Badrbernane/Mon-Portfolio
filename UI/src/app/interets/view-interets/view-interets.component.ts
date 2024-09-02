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

  constructor(private apiService: ApiService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
  
  this.apiService.getInteretsByPersonneId(1048).subscribe(
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
