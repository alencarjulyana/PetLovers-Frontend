import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Service/usuario.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.usuarioService.autenticarUsuario(username, password).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem('usuario', JSON.stringify(response));
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error('Erro ao autenticar usuário:', error);
        this.erroMensagem = 'Usuário ou senha incorretos!';
      }
    );
  }
}
