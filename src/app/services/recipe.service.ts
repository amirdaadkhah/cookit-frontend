import { environment } from '@/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, shareReplay, throwError } from 'rxjs';
import { RecipePayload } from '../models/recipe.model';
import { ApiService } from './api.service';

export interface SearchForRecipePayload {
  ingredientIds: number[]; // selected ingredient ids by user
  mode?: string; // search mode -> match all | best match
  limit?: number; // limit of search results
  category?: string | null; // breakfast | lunch | dinner | snack | salad | dessert
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiURL = environment.apiURL;
  private readonly cache = new Map<string, Observable<RecipePayload>>();

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  searchRecipes(payload: SearchForRecipePayload): Observable<any> {
    return this.http.post(
      `${this.apiURL}/recipe/search`,
      payload
    );
  }

  addRecipe(recipe: RecipePayload) {
    return this.http.post(
      `${this.apiURL}/add/recipe`,
      recipe
    );
  }

  // search a recipe by id and get by existance id & title of the recipe
  async isExist(id: string): Promise<{ exists: boolean; data: any }> {
    try {
      const res = await firstValueFrom(
        this.apiService.isRecipeExist({ id })
      )
      return res;

    } catch (err) {
      console.error('search in DB failed!!!', err);
      return { exists: false, data: null };
    }
  }

  getRecipe(id: string): Observable<RecipePayload> {
    const cached = this.cache.get(id);
    if (cached) { return cached; }

    const request$ = this.apiService.getRecipeById(id).pipe(
      catchError(error => {
        this.cache.delete(id);
        return throwError(() => error);
      }),
      shareReplay({
        bufferSize: 1,
        refCount: false
      })
    );

    this.cache.set(id, request$);
    return request$;
  }
}