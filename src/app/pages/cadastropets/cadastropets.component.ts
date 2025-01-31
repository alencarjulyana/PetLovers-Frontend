import { Component } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastropets',
  templateUrl: './cadastropets.component.html',
  styleUrls: ['./cadastropets.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule]
})
export class CadastroPetsComponent {
  pet = {
    nome: '',
    tipo: '',
    raca: '',
    porte: '',
    sexo: '',
    castrado: '',
    foto: ''
  };

  constructor(private petService: PetService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pet.foto = e.target.result; // Converte a imagem em Base64
        (document.getElementById('preview') as HTMLImageElement).src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  salvarPet() {
    try {
      let pets = JSON.parse(localStorage.getItem("pets") || "[]");
      pets.push(this.pet);
      localStorage.setItem("pets", JSON.stringify(pets));
      console.log("Pet salvo com sucesso!");

      // Resetando o formulário após salvar
      this.pet = {
        nome: '',
        tipo: '',
        raca: '',
        porte: '',
        sexo: '',
        castrado: '',
        foto: ''
      };

      // Resetando a imagem de pré-visualização
      (document.getElementById('preview') as HTMLImageElement).src = "assets/placeholder-image.png";
    } catch (error) {
      console.error("Erro ao salvar pet:", error);
    }
  }
}
