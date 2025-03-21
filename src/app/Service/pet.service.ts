import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PetService {

  private apiUrl = 'http://localhost:8080/pets';

  constructor(private http: HttpClient) {
  }

  cadastrarPet(pet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pet);

  }
}
