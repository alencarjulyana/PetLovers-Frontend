import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  providers: [UsuarioService] 
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  erroMensagem: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value; 

    this.usuarioService.loginUsuario({ email, password }).subscribe({
      next: (response) => {
        if (response) {
          sessionStorage.setItem('usuarioLogado', JSON.stringify(response)); 
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Erro ao autenticar usuário:', error);
        this.erroMensagem = 'Usuário ou senha incorretos!';
      }
    });
  }
}
