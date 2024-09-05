
import { Component, TrackByFunction } from '@angular/core';
import { experience } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'view-experiences',
  templateUrl: './view-experiences.component.html',
  styleUrl: './view-experiences.component.scss'
})
export class ViewExperiencesComponent {
  experience: experience[] = [];
  
  constructor(private apiservice: ApiService, private snackBar: MatSnackBar) {
    apiservice.getAllExperiences().subscribe({
      next: (res: any) => {
        console.log(res);
        this.experience = res;
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
  trackById(index: number, item: experience): number {
    return item.id;  // Supposant que `id` est une propriété unique dans `experience`
  }
}
