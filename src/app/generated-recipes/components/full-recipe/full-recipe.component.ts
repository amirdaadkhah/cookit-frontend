import { RecipePayload } from '@/app/models/recipe.model';
import { RecipeService } from '@/app/services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-full-recipe',
  templateUrl: './full-recipe.component.html',
  styleUrls: ['./full-recipe.component.scss'],
  standalone: true,
})
export class FullRecipeComponent implements OnInit {
  recipe: RecipePayload | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');

    if (!recipeId) {
      this.error = 'Recipe ID is missing';
      return;
    }

    this.loadRecipe(recipeId);
  }

  private async loadRecipe(recipeId: string): Promise<void> {
    this.isLoading = true;
    this.error = null;

    this.recipeService.getRecipe(recipeId).subscribe({
      next: (res) => {
        this.recipe = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Could not load recipe';
        this.isLoading = false;
      },
    })
  }

  goBack(): void {
    this.location.back();
  }
}