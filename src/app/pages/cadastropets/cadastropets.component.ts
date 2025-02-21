import { Component } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-cadastropets',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent],
  templateUrl: './cadastropets.component.html',
  styleUrls: ['./cadastropets.component.css']
})
export class CadastroPetsComponent {
  petData = {
    name: '',
    photo: '',
    type: '',
    breed: '',
    size: '',
    sex: '',
    neutered: false
  };

  previewUrl: string | ArrayBuffer | null = null; // Para pré-visualizar a imagem
  constructor(private petService: PetService, private authService: AuthService, private router: Router) {}

  // 🔹 Função para manipular o upload de imagem
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.petData.photo = reader.result as string; // Converte a imagem para Base64
      };
      reader.readAsDataURL(file);
    }
  }

  // 🔹 Função para cadastrar um pet
  cadastrarPet(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error("Usuário não está logado!");
      return;
    }

    this.petService.createPet(userId, this.petData).subscribe(response => {
      console.log('✅ Pet cadastrado com sucesso!', response);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.error("❌ Erro ao cadastrar pet:", error);
    });
  }

  // 🔹 Função para fazer logout
  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
