import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RecipeSearchResult } from './model/generated-recipe.model';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipesHeroComponent } from './components/recipes-hero/recipes-hero.component';
import { RecipeResultService } from '../services/recipe-result.service';
import { RecipeService } from '../services/recipe.service';
import { RecipePayload } from '../models/recipe.model';

@Component({
  selector: 'app-generated-recipes',
  templateUrl: './generated-recipes.component.html',
  styleUrls: ['./generated-recipes.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RecipeCardComponent,
    RecipeDetailComponent,
    RecipesHeroComponent
  ]
})
export class GeneratedRecipesComponent {
  readonly selectedRecipeDetails = signal<RecipePayload | null>(null);
  readonly loadingRecipeDetails = signal(false);
  readonly recipes = this.recipeResultService.recipes;
  readonly payload = computed(() => {
    const payload = this.recipeResultService.payload();
    if (!payload) {
      throw new Error('Recipe payload is not available');
    }
    return payload;
  });
  selectedRecipeId: string = '';

  constructor(
    private router: Router,
    private recipeResultService: RecipeResultService,
    private recipeService: RecipeService) {
  }

  selectRecipe(recipe: RecipeSearchResult): void {
    this.recipeService.getRecipe(recipe.recipe_id).subscribe({
      next: (res) => {
        this.selectedRecipeDetails.set(res);
        this.selectedRecipeId = recipe.recipe_id;
      },
      error: (err) => {
        console.log('!!! error by loading selected recipe details', err);
        this.loadingRecipeDetails.set(false);
        this.selectedRecipeId = '';
      },
    })
  }

  goBack(): void {
    this.router.navigate(['/']); // TODO: BACK to INGREDIENT selection
  }
}