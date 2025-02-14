import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'userData'; 

  constructor() {}

  saveUserData(userData: any): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(userData));
  }

  getUserId(): string | null {
    const userData = sessionStorage.getItem(this.storageKey);
    if (!userData) {
      console.warn("⚠ Nenhum usuário encontrado no sessionStorage!");
      return null;
    }
    try {
      const user = JSON.parse(userData);
      return user.id || null;
    } catch (error) {
      console.error("❌ Erro ao parsear userData:", error);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.storageKey) !== null;
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
