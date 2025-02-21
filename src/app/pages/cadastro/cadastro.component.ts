// src/app/pages/cadastro/cadastro.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [CommonModule, ReactiveFormsModule] 
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,  private router: Router ) {
    this.cadastroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(1)]],
      address: ['', [Validators.required, Validators.minLength(1)]], 
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      this.usuarioService.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next: (res: any) => {
          console.log(res.message || 'Usuário cadastrado com sucesso!');
          this.router.navigate(['/login']); 
        },
        error: (err: any) => {
          console.error('Erro ao cadastrar usuário', err.message || err);
        }
      });
    } else {
      console.log('Formulário inválido! Verifique os campos.');
    }
  }
  
}
