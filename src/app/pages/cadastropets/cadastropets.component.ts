import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastropets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastropets.component.html',
  styleUrls: ['./cadastropets.component.css']
})
export class CadastroPetsComponent {
  pet = {
    tipo: '',
    nome: '',
    idade: '',
    raca: '',
    porte: '',
    castrado: '',
    sexo: ''
  };

  imagemPreview: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagemPreview = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  cadastrarPet() {
    console.log('Pet cadastrado:', this.pet);
    alert('Pet cadastrado com sucesso!');
  }

}
