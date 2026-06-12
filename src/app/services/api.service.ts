import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  loginAdmin(data: any) {
    return this.http.post(`${this.baseUrl}/admin/login`, data);
  }

  // createPost(data: any, token: string) {
  //   return this.http.post(`${this.baseUrl}/admin/posts`, data, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  // }
}