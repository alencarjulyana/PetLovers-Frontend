import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  erroMensagem: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.erroMensagem = "Preencha todos os campos corretamente.";
      return;
    }
  
    this.usuarioService.loginUsuario({
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }).subscribe(response => {
      if (response && response.id) {
        console.log("✅ Login bem-sucedido! Salvando usuário e redirecionando..."  , response.id);
        this.authService.saveUserData(response); 
        this.router.navigate(['/dashboard']);
      } else {
        this.erroMensagem = "❌ Credenciais inválidas!";
      }
    }, error => {
      this.erroMensagem = "❌ Erro ao fazer login. Tente novamente.";
      console.error("❌ Erro ao fazer login:", error);
    });
  }
  
}
