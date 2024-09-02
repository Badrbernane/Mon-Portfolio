import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';
import { projet } from './../../models/models';
import { Component } from '@angular/core';

@Component({
  selector: 'view-project',
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.scss'
})
export class ViewProjectComponent {
  projet: projet[] = [];
  
  constructor(private apiservice: ApiService, private snackBar: MatSnackBar) {
    apiservice.getAllprojets().subscribe({
      next: (res: any) => {
        console.log(res);
        this.projet = res;
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
  trackById(index: number, item: projet): number {
    return item.id;  // Supposant que `id` est une propriété unique dans `experience`
  }
}
