import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { EditPetDialogComponent } from '../../edit-pet-dialog/edit-pet-dialog.component';
import { HeaderComponent } from '../../header/header.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pets: any[] = [];
  filteredPets: any[] = [];
  userId: string | null = null;
  constructor(private petService: PetService, private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Obtém o ID do usuário logado
  
    // 1) Carrega todos os pets
    this.petService.getAllPets().subscribe({
      next: (pets) => {
        this.pets = pets;
  
        // 2) Se o usuário estiver logado, carrega a lista de favoritos
        if (this.userId) {
          this.petService.getFavoritePetsDetails(this.userId).subscribe({
            next: (favorites) => {
              // favorites é um array com os detalhes dos pets favoritados
              const favoriteIds = favorites.map((petFav: any) => petFav.id);
  
              // Marca isFavorited = true se o pet estiver na lista de favoritos
              this.pets.forEach((pet: any) => {
                pet.isFavorited = favoriteIds.includes(pet.id);
              });
  
              // Filtra etc, se necessário
              this.filteredPets = this.pets;
            },
            error: (err) => {
              console.error("Erro ao carregar favoritos:", err);
              // Mesmo que dê erro ao carregar favoritos,
              // vamos exibir os pets
              this.filteredPets = this.pets;
            }
          });
        } else {
          // Se não estiver logado, apenas exibe todos os pets
          this.filteredPets = this.pets;
        }
      },
      error: (err) => {
        console.error("Erro ao listar todos os pets:", err);
      }
    });
  }

  filterPets(filter: string): void {
    const lowerFilter = filter.toLowerCase(); // 🔹 Garante case-insensitive
    this.filteredPets = this.pets.filter(pet => {
      const matchesType = pet.type?.toLowerCase() === lowerFilter;
      const matchesSex = (lowerFilter === 'male' && pet.sex?.toLowerCase() === 'male') ||
                         (lowerFilter === 'female' && pet.sex?.toLowerCase() === 'female');
      const matchesSize = pet.size?.toLowerCase() === lowerFilter;
  
      return matchesType || matchesSex || matchesSize;
    });
  }
  
  

  resetFilters(): void {
    this.filteredPets = this.pets;
  }
  
  deletePet(petId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Tem certeza que deseja excluir este pet?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.petService.deletePet(petId).subscribe({
          next: (response) => {
            console.log("Pet deletado com sucesso!", response);
            this.loadPets();
          },
          error: (error) => {
            console.error("Erro ao deletar pet:", error);
          }
        });
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
  
  editPet(pet: any): void {
    const dialogRef = this.dialog.open(EditPetDialogComponent, {
      width: '400px',
      data: { pet }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Chame o serviço para atualizar o pet; supondo que o endpoint seja PUT /pets/{petId}
        this.petService.updatePet(pet.id, result).subscribe({
          next: (response) => {
            console.log("Pet atualizado com sucesso!", response);
            this.loadPets();
          },
          error: (error) => {
            console.error("Erro ao atualizar pet:", error);
          }
        });
      }
    });
  }

  toggleFavorite(pet: any): void {
  const userId = this.authService.getUserId();
  if (!userId) {
    // user não logado
    return;
  }

  if (pet.isFavorited) {
    // Desfavoritar
    this.petService.unfavoritePet(userId, pet.id).subscribe({
      next: (res) => {
        console.log("Pet desfavoritado com sucesso!", res);
        pet.isFavorited = false;
      },
      error: (err) => {
        console.error("Erro ao desfavoritar pet:", err);
      }
    });
  } else {
    // Favoritar
    this.petService.favoritePet(userId, pet.id).subscribe({
      next: (res) => {
        console.log("Pet favoritado com sucesso!", res);
        pet.isFavorited = true;
      },
      error: (err) => {
        console.error("Erro ao favoritar pet:", err);
      }
    });
  }
}
}