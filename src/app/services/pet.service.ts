import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  createPet(ownerId: string, petData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ownerId}/pets`, petData);
  }

  getAllPets(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/pets`);
  }

  updatePet(petId: string, petData: any): Observable<any> {
    return this.http.put(`http://localhost:8080/pets/${petId}`, petData);
  }

  deletePet(petId: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/pets/${petId}`, { responseType: 'text' });
  }

  favoritePet(userId: string, petId: string): Observable<any> {
    return this.http.post(`http://localhost:8080/pets/${userId}/favorites`, { petId });
  }

  // 🔹 Listar pets do usuário
  getPetsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/pets`);
  }

  unfavoritePet(userId: string, petId: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/pets/${userId}/favorites/${petId}`);
  }
  
  getFavoritePetsDetails(userId: string): Observable<any> {
    return this.http.get(`http://localhost:8080/pets/${userId}/favorites/details`);
  }
}


// // 🔹 Listar favoritos do usuário
  // getFavoritePets(userId: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/${userId}/favorites/details`);
  // }

  // // 🔹 Adicionar um pet aos favoritos
  // addFavoritePet(userId: string, petId: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/${userId}/favorites`, { userId, petId });
  // }