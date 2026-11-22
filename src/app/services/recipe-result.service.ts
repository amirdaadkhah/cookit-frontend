import { computed, Injectable, signal } from '@angular/core';
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

  readonly recommendedRecipe = computed<RecipeSearchResult | null>(() => {
    const recipes = this._recipes();
    if (recipes.length === 0) { return null; }

    return recipes.reduce((best, current) =>
      current.score > best.score
        ? current
        : best
    );
  });

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