import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {UsuarioService} from "../../Service/usuario.service";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.cadastroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      birthday: ['', [Validators.required, Validators.minLength(8)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      this.usuarioService.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next: (res: object) => {
          console.log('Usuário cadastrado com sucesso!', res);
        },
        error: (err: object) => {
          console.error('Erro ao cadastrar usuário', err);
        }
      });
    } else {
      console.log('Formulário inválido! Verifique os campos.');
    }
  }
}
