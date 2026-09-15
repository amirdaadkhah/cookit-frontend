import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.prod';
import { RecipePayload } from '../models/recipe.model';

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

  isRecipeExist(data: { id: string }) {
    return this.http.post<{ exists: boolean; data: any }>(`${this.baseUrl}/recipe/exists`, data);
  }

  getRecipeById(id: string) {
    return this.http.get<RecipePayload>(`${this.baseUrl}/recipe/${id}`);
  }

  // createPost(data: any, token: string) {
  //   return this.http.post(`${this.baseUrl}/admin/posts`, data, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  // }
}