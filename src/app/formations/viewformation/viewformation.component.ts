import { FormationsModule } from './../formations.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';
import { formation } from './../../models/models';
import { Component } from '@angular/core';

@Component({
  selector: 'viewformation',
  templateUrl: './viewformation.component.html',
  styleUrl: './viewformation.component.scss'
})
export class ViewformationComponent {
    filteredFormations: formation[] = [];
    displayedColumns: string[] = [
      'id',
      'ecole',
      'description',
      'datedebut',
      'datefin',
      'actuel',
    ];
    formations: formation[] = [];

    constructor(private apiservice: ApiService, private snackBar: MatSnackBar) {
      apiservice.getformation().subscribe({
        next: (res: any) => {
          this.formations = res;
          localStorage.setItem("angular18Login", JSON.stringify(this.formations));
          console.log(res);
        },
        error: (err) => {
          this.snackBar.open('Error fetching data', 'Close', {
            duration: 3000,
          });
          console.error(err);
        }
      });
    }

    searchformations(value: string) {
      const searchValue = value.toLowerCase(); // Convertit la valeur de recherche en minuscules
      this.filteredFormations = this.formations.filter((formation) =>
      formation.titre.toLowerCase().includes(searchValue)
      );
    }

    trackById(index: number, formation: formation): number {
      return formation.id; // Utilisez la propriété unique de chaque objet
    }
}
