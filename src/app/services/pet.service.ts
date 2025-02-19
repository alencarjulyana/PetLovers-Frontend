import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:8080/users'; // Base URL do backend

  constructor(private http: HttpClient) {}

  // 🔹 Criar um novo pet (User Service chama o Pet Service via gRPC)
  createPet(ownerId: string, petData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ownerId}/pets`, petData);
  }

  getAllPets(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/pets`);
  }

  deletePet(petId: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/pets/${petId}`, { responseType: 'text' });
  }

  // 🔹 Listar pets do usuário
  getPetsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/pets`);
  }

  // 🔹 Listar favoritos do usuário
  getFavoritePets(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/favorites/details`);
  }

  // 🔹 Adicionar um pet aos favoritos
  addFavoritePet(userId: string, petId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/favorites`, { userId, petId });
  }
}
