import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private apiService: ApiService) {}

  async login(username: string, password: string): Promise<boolean> {
    try {
      const res: any = await firstValueFrom(
        this.apiService.loginAdmin( { username, password })
      )
      localStorage.setItem('token', res.token);
      return true;
    } catch (err) {
      console.error('Login failed!!!', err);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
