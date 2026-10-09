import { Component, inject, signal } from '@angular/core';
import { RecipePayload } from '../models/recipe.model';
import { RecipeResultService } from '../services/recipe-result.service';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { getQtyString } from '../utils/recipe.utils';
import { IngredientService } from '../services/ingredient-service';
import { FooterComponent } from '../footer/footer.component';
import { CommentsComponent } from '../comment/comments.component';
import { RecipeSearchResult } from '../generated-recipes/model/generated-recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FooterComponent,
    CommentsComponent
  ]
})
export class RecipeComponent {
  readonly recipes = this.recipeResultService.recipes();
  readonly recipeToShow = signal<RecipePayload | null>(null);
  private readonly route = inject(ActivatedRoute);
  readonly getQtyString = getQtyString;
  tmp: string = './assets/images/recipe-hero.png';
  recipeId: string = '';
shuffledRecipes: RecipeSearchResult[] = [];


  constructor(
    private recipeResultService: RecipeResultService,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadRecipe(id);
      this.setRandomRecipes(id);
      // this.router.navigate(
      //   ['/recipe', 'correctSlug'], // TODO: decide to implement this for user
      //   { replaceUrl: true }
      // );
      // this.recipeId = params.get('id');
    });
    this.ingredientService.loadIngredients();
  }

  private loadRecipe(id: string | null) {
    if (!id) {
      console.log('!!! ID is NULL');
      return;
    }

    this.recipeService.getRecipe(id).subscribe({
      next: (res) => {
        this.recipeToShow.set(res);
        this.recipeId = id;
      },
      error: (err) => {
        console.log('!!! error by loading full recipe details', err);
      },
    })
  }

  private setRandomRecipes(id: string | null): void {
    this.shuffledRecipes = this.recipes
      .filter(recipe => recipe.recipe_id !== id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  getIngredientNameById(id: number | null): string {
    if (id === null) { return ''; };
    return this.ingredientService.getIngredientNameById(id);
  }

  openRecipe(recipeId: string): void {
    this.router.navigate([
      '/recipe',
      recipeId
    ]);
  }
}
