import { Component } from '@angular/core';
import { Langue } from '../../models/models';
import { ApiService } from '../../shared/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'view-langues',
  templateUrl: './view-langues.component.html',
  styleUrl: './view-langues.component.scss'
})
export class ViewLanguesComponent {
    
  selectedLangues: Langue[] = [];  // Correction ici
  langues: Langue[] = [];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
  
  this.apiService.getLanguesByPersonneId(1048).subscribe(
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

