import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/users';
  private storageKey = 'userData'; 

  constructor(private http: HttpClient) {}
  
  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, usuario);
  }

  loginUsuario(userData: any): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/login`, userData).subscribe(response => {
        if (response && response.id) {
          console.log("✅ Login bem-sucedido! Salvando usuário na sessão...");
          sessionStorage.setItem(this.storageKey, JSON.stringify(response)); // 🔹 Agora usa 'userData'
          observer.next(response);
        } else {
          observer.error("❌ Erro no login: Resposta inválida");
        }
      }, error => {
        observer.error(error);
      });
    });
  }

  obterUsuarioDoSessionStorage(): any {
    const usuario = sessionStorage.getItem(this.storageKey);
    return usuario ? JSON.parse(usuario) : null;
  }

  removerUsuarioDoSessionStorage(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
