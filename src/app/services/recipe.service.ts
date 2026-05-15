import { environment } from '@/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiURL = environment.apiURL;
  
  constructor(
    private http: HttpClient
  ) {}

  searchRecipes(payload: {
    ingredientIds: number[]; // selected ingredient ids by user
    mode?: string; // search mode -> match all | best match
    limit?: number;
    category?: string | null; // breakfast | lunch | dinner | snack | salad | dessert
  }): Observable<any> {
    return this.http.post(`${this.apiURL}/recipes/search`, payload);
  }

  addRecipe(recipe: any) {
    return this.http.post(
      `${this.apiURL}/add/recipe`,
      recipe
    );
  }

  getIngredients() {
    return this.http.get(
      '/ingredients'
    );
  }
}