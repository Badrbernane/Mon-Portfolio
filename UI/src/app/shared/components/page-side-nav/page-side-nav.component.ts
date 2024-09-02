import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export interface NavigationItem {
  id: number;
  value: string;
  link: string;
}

@Component({
  selector: 'page-side-nav',
  templateUrl: './page-side-nav.component.html',
  styleUrls: ['./page-side-nav.component.scss'] // Assurez-vous que le nom est correct
})
export class PageSideNavComponent implements OnInit {
  panelName: string = 'visitor panel';
  navItems: NavigationItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Abonnez-vous à l'état de connexion
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        // Si l'utilisateur est connecté, afficher le menu et les éléments
        this.panelName = 'user panel';
        this.navItems = [
          { id: 1, value: 'Personne', link: 'Personne' },
          { id: 2, value: 'Formation', link: 'Formation' },
          { id: 3, value: 'Experience', link: 'Experience' },
          { id: 4, value: 'Projet', link: 'Projet' },
          { id: 5, value: 'Certificat', link: 'Certificat' },
          { id: 6, value: 'Compétence', link: 'Compétence' },
          { id: 7, value: 'Langue', link: 'Langue' },
          { id: 8, value: 'Intéret', link: 'Intéret' },
        ];
      } else {
        // Si l'utilisateur n'est pas connecté, masquer le menu ou afficher un menu différent
        this.panelName = 'visitor panel';
        this.navItems = []; // Pas d'éléments de navigation
      }
    });
  }

  trackByFn(index: number, item: NavigationItem): number {
    return item.id; // Utilisez 'id' comme clé unique
  }
}
