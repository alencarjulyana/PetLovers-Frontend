import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Mark as standalone
  imports: [CommonModule, RouterModule], // Import necessary modules
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pets: any[] = []; // Array to store all pets
  filteredPets: any[] = []; // Array to store filtered pets

  ngOnInit() {
    this.loadPets(); // Load pets when the component initializes
  }

  
  loadPets() {
    const pets = localStorage.getItem('pets');
    if (pets) {
      this.pets = JSON.parse(pets);
      this.filteredPets = this.pets;
    }
  }

  filterPets(filter: string) {
    this.filteredPets = this.pets.filter(pet =>
      pet.tipo === filter || pet.sexo === filter || pet.porte === filter
    );
  }

  // Reset filters and show all pets
  resetFilters() {
    this.filteredPets = this.pets;
  }
}
