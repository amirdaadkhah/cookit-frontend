import { environment } from '@/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeComment } from '../models/comment.modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getComments(recipeId: string): Observable<RecipeComment[]> {
    return this.http.get<RecipeComment[]>(
      `${this.apiUrl}/recipe/${recipeId}/comments`
    );
  }

  addComment(recipeId: string, comment: string): Observable<RecipeComment> {
    return this.http.post<RecipeComment>(
      `${this.apiUrl}/recipe/${recipeId}/comments`,
      { comment }
    );
  }
}
