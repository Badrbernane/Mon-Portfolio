import { Component } from '@angular/core';

export interface NavigationItem{
  id: number;
  value: string;
  link: string;
}

@Component({
  selector: 'page-side-nav',
  templateUrl: './page-side-nav.component.html',
  styleUrl: './page-side-nav.component.scss'
})
export class PageSideNavComponent {
  panelName: string = 'visitor panel';
  navItems: NavigationItem[] = [];
  constructor(){
    this.navItems = [
      { id:1, value:'Personne', link: 'Personne'},
      { id:2, value:'Formation', link: 'Formation'},
      { id:3, value:'Experience', link: 'Experience'},
      { id:4, value:'Compétence', link: 'Compétence'},
      { id:5, value:'Projet', link: 'Projet'},
      { id:6, value:'Certificat', link: 'Certificat'},
      { id:7, value:'Langue', link: 'Langue'},
      { id:8, value:'Intéret', link: 'Intéret'},
    ];

    }
    trackByFn(index: number, item: NavigationItem): number {
      return item.id; // Utilisez 'id' comme clé unique
    }
    // Vérifiez si l'utilisateur est connecté
    }
