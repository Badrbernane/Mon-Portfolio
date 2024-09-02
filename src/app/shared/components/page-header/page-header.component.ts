import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

   // Méthode pour gérer la déconnexion
  logout(): void {
    this.authService.logout(); // Appelle la méthode de logout du AuthService
    this.router.navigateByUrl('/login'); // Redirige vers la page de connexion après déconnexion
  }
}
