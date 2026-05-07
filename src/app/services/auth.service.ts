import { Injectable } from '@angular/core';

// TODO: make secure by checking auth from the server and db
@Injectable({
  providedIn: 'root',
})
export class AuthService {
    async login(username: string, password: string): Promise<boolean> {
    // Replace this with your real API call
    return username === 'admin' && password === 'admin';
  }
}
