import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-meus-favoritos',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './meus-favoritos.component.html',
  styleUrls: ['./meus-favoritos.component.css']
})
export class MeusFavoritosComponent implements OnInit {
  favoritePets: any[] = [];
  userId: string | null = null;

  constructor(private petService: PetService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.loadFavoritePets();
    }
  }

  loadFavoritePets(): void {
    this.petService.getFavoritePetsDetails(this.userId!).subscribe({
      next: (pets) => {
        this.favoritePets = pets;
      },
      error: (err) => {
        console.error("Erro ao carregar favoritos:", err);
      }
    });
  }

  unfavoritePet(petId: string): void {
    if (!this.userId) return;
    this.petService.unfavoritePet(this.userId, petId).subscribe({
      next: () => {
        console.log("Pet removido dos favoritos com sucesso!");
        // Remove localmente
        this.favoritePets = this.favoritePets.filter(p => p.id !== petId);
      },
      error: (err) => {
        console.error("Erro ao remover favorito:", err);
      }
    });
  }
}
