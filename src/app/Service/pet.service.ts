import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private storageKey = 'pets';

  getPets(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addPet(pet: any): void {
    const pets = this.getPets();
    pets.push(pet);
    localStorage.setItem(this.storageKey, JSON.stringify(pets));
  }

  
}
