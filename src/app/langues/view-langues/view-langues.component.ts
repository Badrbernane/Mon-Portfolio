import { Component } from '@angular/core';
import { Langue } from '../../models/models';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'view-langues',
  templateUrl: './view-langues.component.html',
  styleUrl: './view-langues.component.scss'
})
export class ViewLanguesComponent {
    
  selectedLangues: Langue[] = [];  // Correction ici
  langues: Langue[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar,private authService: AuthService){}

  ngOnInit(): void {
    const id = this.authService.getPersonneId(); // Récupère l'ID de la personne;  // Remplacez par l'ID de la personne concernée
    if(id)
  this.apiService.getLanguesByPersonneId(id).subscribe(
    (data: any[]) => {
      console.log('API Response:', data);  // Debugging ici
      this.selectedLangues = data;
      this.langues = data;
    },
    error => {
      console.error('Error fetching competences:', error);
      this.snackBar.open('Error fetching competences', 'Close', {
        duration: 3000
      });
    }
  );
  }
trackByLangue(index: number, langu: Langue): number {
  return langu.id;  // Correction ici, pour correspondre à l'interface
}
}

