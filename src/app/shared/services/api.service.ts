import { formation, experience } from './../../models/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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
}
