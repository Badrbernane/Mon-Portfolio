import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/services/api.service';
import { certificat } from './../../models/models';
import { Component } from '@angular/core';

@Component({
  selector: 'view-certificat',
  templateUrl: './view-certificat.component.html',
  styleUrl: './view-certificat.component.scss'
})
export class ViewCertificatComponent {
  certificat: certificat[] = [];
  
  constructor(private apiservice: ApiService, private snackBar: MatSnackBar) {
    apiservice.getAllcertificat().subscribe({
      next: (res: any) => {
        console.log(res);
        this.certificat = res;
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
  trackById(index: number, item: certificat): number {
    return item.id;  // Supposant que `id` est une propriété unique dans `experience`
  }
}
