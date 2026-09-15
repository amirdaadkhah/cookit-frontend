import { Injectable, signal } from '@angular/core';
import { RecipeSearchResult } from '../generated-recipes/model/generated-recipe.model';
import { SearchForRecipePayload } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResultService {
  private readonly _recipes = signal<RecipeSearchResult[]>([]);
  readonly recipes = this._recipes.asReadonly();
  private readonly _payload = signal<SearchForRecipePayload | null>(null);
  readonly payload = this._payload.asReadonly();

  setRecipes(recipes: RecipeSearchResult[]): void {
    this._recipes.set(recipes);
  }

  setPayload(payload: SearchForRecipePayload): void {
    this._payload.set(payload);
  }

  clear(): void {
    this._recipes.set([]);
    this._payload.set(null);
  }
}