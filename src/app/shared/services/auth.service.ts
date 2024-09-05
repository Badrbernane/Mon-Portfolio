import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  private tokenKey = 'authToken';
  private personneIdKey = 'personneId';

  constructor(private router: Router) {
    const token = this.getToken();
    this.loggedInSubject = new BehaviorSubject<boolean>(!!token);
  }

  // Observable pour l'état de connexion
  get isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  // Fonction de login
   // Fonction de login
   login(token: string, personneId: number): void { // Ajout de l'ID de la personne
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.personneIdKey, personneId.toString()); // Stocker l'ID de la personne
      this.loggedInSubject.next(true);
      this.router.navigateByUrl('/home');
    }
  }


  // Fonction de logout
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.tokenKey);
      this.loggedInSubject.next(false);
      this.router.navigateByUrl('/login');
    }
  }

  // Vérification de l'état de connexion
  checkLogin(): boolean {
    const token = this.getToken();
    const isLoggedIn = !!token;
    this.loggedInSubject.next(isLoggedIn);
    return isLoggedIn;
  }

  // Récupération du token
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Récupération de l'ID de la personne connectée
  getPersonneId(): number | null {
    if (this.isLocalStorageAvailable()) {
      const personneId = localStorage.getItem(this.personneIdKey);
      return personneId ? Number(personneId) : null;
    }
    return null;
  }

  // Vérifie si localStorage est disponible
  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }
}

