import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  // 🔹 Cadastro de usuário
  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, usuario);
  }

  // 🔹 Login do usuário
  loginUsuario(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData);
  }

  // 🔹 Armazena o usuário logado no sessionStorage
  salvarUsuarioNoSessionStorage(usuario: any): void {
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  // 🔹 Obtém o usuário logado do sessionStorage
  obterUsuarioDoSessionStorage(): any {
    const usuario = sessionStorage.getItem('usuarioLogado');
    return usuario ? JSON.parse(usuario) : null;
  }

  // 🔹 Remove o usuário do sessionStorage (logout)
  removerUsuarioDoSessionStorage(): void {
    sessionStorage.removeItem('usuarioLogado');
  }
}
