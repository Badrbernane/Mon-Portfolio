import { formation, experience, projet, certificat, competence, Langue, Interet, Personne } from './../../models/models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:5002/api';  // Base URL de votre API
  constructor(private http: HttpClient,) {}
  
  register(Personne: any) {
    return this.http.post('https:/localhost:5002/api/Personne/register', Personne);
  }


  login(Personne: any){
    return this.http.post('https://localhost:5002/api/Personne/login', Personne, );
  }

  getformation(){
    return this.http.get('https://localhost:5002/api/Formations');
  }

  addnewformation(formation: any){
    return this.http.post('https://localhost:5002/api/Formations', formation);
  }

  deleteExistformation(id: number){
    return this.http.delete('https://localhost:5002/api/Formations/'+id, {
      responseType: 'text',
    });
  }

  addnewexperience(experience: any){
    return this.http.post('https://localhost:5002/api/Experience', experience);
  }

  getAllExperiences(){
    return this.http.get<experience[]>('https://localhost:5002/api/Experience');
  }

  deleteExperience(id: number){
    return this.http.delete('https://localhost:5002/api/Experience/'+id, {
      responseType: 'text',
  });
}

  updateExperience(id: number, experience: any): Observable <any> {
  return this.http.put<any>(`https://localhost:5002/api/Experience/${id}`, experience);
} 

  getAllprojets(){
  return this.http.get<projet[]>('https://localhost:5002/api/Projets');
}

  addnewprojet(projet: any){
  return this.http.post('https://localhost:5002/api/Projets', projet);
}

  updateprojet(id: number, projet: any): Observable<any> {
    return this.http.put<any>(`https://localhost:5002/api/Projets/${id}`, projet);
  }

  deleteprojet(id: number){
    return this.http.delete('https://localhost:5002/api/Projets/'+id, {
      responseType: 'text',
  });
}

  addnewcertificat(certificat: any){
    return this.http.post('https://localhost:5002/api/Certificat', certificat);
  }

  getAllcertificat(){
    return this.http.get<certificat[]>('https://localhost:5002/api/Certificat');
  }

  updatecertificat(id: number, certificat: any): Observable <any> {
    return this.http.put<any>(`https://localhost:5002/api/Certificat/${id}`, certificat);
  }

  deletecertificat(id: number){
    return this.http.delete('https://localhost:5002/api/Certificat/'+id, {
      responseType: 'text',
    });
  }
//______________________________________________________----------------competences----------------------________________________________________________
  getAllcompetence(): Observable<competence[]> {
    return this.http.get<competence[]>(`https://localhost:5002/api/Compétences`);
  }

  addnewcompetence(competence: competence): Observable<competence>{
    return this.http.post<competence>('https://localhost:5002/api/Compétences', competence);
  }

  addCompetencesToPerssComp(personneId: number, competences: number[]): Observable<any> {
    const url = `${this.baseUrl}/Compétences/personne/${personneId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Appel POST avec le tableau des IDs de compétences
    return this.http.post<any>(url, competences, { headers, responseType: 'text' as 'json' });
  }

  getCompetencesByPersonneId(personneId: number): Observable<competence[]> {
    return this.http.get<competence[]>(`${this.baseUrl}/Compétences/personne/${personneId}`);
  }

  // Méthode pour supprimer une compétence pour une personne spécifique
  deleteCompetenceByPersonneIdAndCompetenceId(personneId: number, competenceId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Compétences/personne/${personneId}/${competenceId}`);
  }
  // --------------------------------------------------------- langues hadchi --------------------------------------------------------------------------
  getAlllangue(): Observable<Langue[]>{
    return this.http.get<Langue[]>(`https://localhost:5002/api/Languess`);
  }

  addnewLangue(Langue: Langue): Observable<Langue>{
    return this.http.post<Langue>('https://localhost:5002/api/Languess', Langue);
  }

  addLanguesToPerssLang(personneId: number, langues: { langueId: number, niveau: string }[]): Observable<any> {
    const url = `${this.baseUrl}/Languess/personne/${personneId}`;
  
  // Créer les paramètres de la query string pour chaque langue
  let params = new HttpParams();
  langues.forEach((langue, index) => {
    params = params.append(`langueId[${index}]`, langue.langueId.toString());
    params = params.append(`niveau[${index}]`, langue.niveau);
  });
  
    // Appel POST avec la query string contenant les données
    return this.http.post<any>(url, {}, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params, responseType: 'text' as 'json' });
  }

  getLanguesByPersonneId(personneId: number): Observable<Langue[]> {
    return this.http.get<Langue[]>(`${this.baseUrl}/Languess/personne/${personneId}`);
  }

  deleteLangueByPersonneIdAndLangueId(personneId: number, LangueId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Languess/personne/${personneId}/${LangueId}`);
  }

  // db ce qui concerne interets --------------------------------------------------------------------------------------------------------------------

  getAllinteret(): Observable<Interet[]>{
    return this.http.get<Interet[]>(`https://localhost:5002/api/CentreIntérets`);
  }

  addnewinteret(interet: Interet): Observable<Interet>{
    return this.http.post<Interet>('https://localhost:5002/api/CentreIntérets', interet);
  }

  addInteretsToPerssInter(personneId: number, Interets: number[]): Observable<any> {
    const url = `${this.baseUrl}/CentreIntérets/personne/${personneId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Appel POST avec le tableau des IDs de compétences
    return this.http.post<any>(url, Interets, { headers, responseType: 'text' as 'json' });
  }

  getInteretsByPersonneId(personneId: number): Observable<Interet[]> {
    return this.http.get<Interet[]>(`${this.baseUrl}/CentreIntérets/personne/${personneId}`);
  }

  deleteInteretByPersonneIdAndInteretId(personneId: number, InteretId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/CentreIntérets/personne/${personneId}/${InteretId}`);
  }

  // maintenant on va travailler sur l'entité personne -------------------------------------------------------------------------------------------------------------------------
  
  addnewpersonne(Personne: any){
    return this.http.post('https://localhost:5002/api/Personne', Personne);
  }

  getpersonne(id: number): Observable<Personne>{
    return this.http.get<Personne>('https://localhost:5002/api/Personne/'+id);
  }

  // Méthode pour changer le mot de passe
  changePassword(id: string, oldPassword: string, newPassword: string, confirmNewPassword: string): Observable<any> {
    const body = { Id: id, OldPassword: oldPassword, NewPassword: newPassword, ConfirmNewPassword: confirmNewPassword };
    return this.http.put('https://localhost:5002/api/Personne/change-password', body);
  }

  updatePersonne(id: number, Personne: any): Observable <any> {
    return this.http.put<any>(`https://localhost:5002/api/Personne/${id}`, Personne);
  } 

  getAllFormations(){
    return this.http.get<formation[]>('https://localhost:5002/api/Formations');
  }

  updateFormation(id: number, formation: any): Observable <any> {
    return this.http.put<any>(`https://localhost:5002/api/Formations/${id}`, formation);
  } 
}
