// // src/app/pages/login/login.component.ts

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { UsuarioService } from '../../services/usuario.service';
// import { Router } from '@angular/router'; // Importar Router

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   imports: [CommonModule, ReactiveFormsModule]
// })
// export class LoginComponent {
//   loginForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private usuarioService: UsuarioService,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   login() {
//     if (this.loginForm.valid) {
//       this.usuarioService.loginUsuario(this.loginForm.value).subscribe({
//         next: (res: any) => {
//           console.log('Login bem-sucedido!', res);
//           this.router.navigate(['/dashboard']); 
//         },
//         error: (err: any) => {
//           console.error('Erro ao fazer login', err);
//         }
//       });
//     } else {
//       console.log('Formulário de login inválido! Verifique os campos.');
//     }
//   }
// }
