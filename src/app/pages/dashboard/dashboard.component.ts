import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pets: any[] = []; 
  filteredPets: any[] = []; 

  constructor(private petService: PetService, private authService: AuthService) {}

  ngOnInit(): void {
    this.petService.getAllPets().subscribe({
      next: (pets) => {
        this.pets = pets;
        this.filteredPets = pets;
      },
      error: (err) => {
        console.error("Erro ao listar todos os pets:", err);
      }
    });
  }

  filterPets(filter: string): void {
    this.filteredPets = this.pets.filter(pet =>
      pet.type === filter || pet.sex === filter || pet.size === filter
    );
  }

  resetFilters(): void {
    this.filteredPets = this.pets;
  }
  
  deletePet(petId: string): void {
    this.petService.deletePet(petId).subscribe({
      next: (response) => {
        console.log("Pet deletado com sucesso!", response);
        // Recarregar a lista
        this.loadPets();
      },
      error: (error) => {
        console.error("Erro ao deletar pet:", error);
      }
    });
  }

  loadPets(): void {
    this.petService.getAllPets().subscribe({
      next: (pets) => {
        this.pets = pets;
        this.filteredPets = pets;
      },
      error: (err) => {
        console.error("Erro ao listar todos os pets:", err);
      }
    });
  }
  
}
