import { Component, Input } from '@angular/core';
import { RecipeDifficulty } from '../../model/generated-recipe.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RecipePayload } from '@/app/models/recipe.model';
import { DifficultyRecipeBadgeComponent } from '@/app/shared/difficulty-recipe-badge/difficulty-recipe-badge.component';
import { IngredientService } from '@/app/services/ingredient-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    DifficultyRecipeBadgeComponent
  ]
})
export class RecipeDetailComponent {
  @Input({ required: true }) recipe!: RecipePayload;
  @Input({ required: true }) recipeId!: string;
  chefTip: string = '';
  private readonly chefTipKey = 'Tip:';

  constructor(
    private ingredientService: IngredientService,
    private router: Router
  ) {
    this.ingredientService.loadIngredients();
  }

  getImage(): string {
    return 'assets/images/recipe-hero.png';
  }

  getChefTip(): string {
    const chefTip = this.recipe.steps.find(step => step.startsWith(this.chefTipKey));
    if (chefTip) {
      return chefTip.substring(this.chefTipKey.length).trim();
    }
    return 'Words can\'t say the taste';
  }

  getDifficulty(): RecipeDifficulty {
    return 'Hard';
  }

  getIngredientName(id: number): string {
    return this.ingredientService.getIngredientNameById(id);
  }

  viewFullRecipe(): void {
    this.router.navigate(['/recipe', this.recipeId]);
  }
}