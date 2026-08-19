import { CartItem, IngredientCartService } from '@/app/services/ingredient-cart.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RecipeGenerateMode, RecipesModeSegmentComponent, SEGMENT } from '../recipes-mode-segment/recipes-mode-segment.component';
import { CommonModule } from '@angular/common';
import { RecipeService, SearchForRecipePayload } from '@/app/services/recipe.service';
import { Router } from '@angular/router';
import { FantasySpinnerComponent } from '@/app/fantasy-spinner/fantasy-spinner.component';
import { ErrorMessageComponent } from '@/app/error-message/error-message.component';

@Component({
  selector: 'app-selected-ingredient-panel',
  templateUrl: './selected-ingredient-panel.component.html',
  styleUrls: ['./selected-ingredient-panel.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RecipesModeSegmentComponent,
    FantasySpinnerComponent,
    ErrorMessageComponent
  ]
})
export class SelectedIngredientPanelComponent {
  private selectedSegment: RecipeGenerateMode = SEGMENT.MATCH_ALL;
  isGenerating: boolean = false;
  generationError: string | null = null;

  constructor(
    public cartService: IngredientCartService,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  removeFromCart(item: CartItem) {
    this.cartService.remove(item);
  }

  onSegmentChanged(value: RecipeGenerateMode) {
    this.selectedSegment = value;
  }

  generateRecipes() {
    const payload: SearchForRecipePayload = this.createPayload();
    this.isGenerating = true;
    this.generationError = null;

    this.recipeService.searchRecipes(payload).subscribe({
      next: (res) => {
        console.log('Recipes:', res, res.length > 0);
        this.isGenerating = false;
        (document.activeElement as HTMLElement)?.blur(); // remove focus from clicked button before leaving the page

        this.router.navigate(['/your-recipes'], {
          state: {
            recipes: res
          }
        });
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isGenerating = false;
        this.generationError =
          'Something went wrong while generating your recipes. Please try again.';
      }
    });
  }

  private createPayload(): SearchForRecipePayload {
    const selectedIds: number[] = [];
    for (const item of this.cartService.cart) {
      const id = item.part?.id ?? item.ingredient.id;
      if (id != null) {
        selectedIds.push(id);
      }
    }
    const payload = {
      ingredientIds: selectedIds,
      mode: this.selectedSegment,
      limit: 10
    }
    return payload;
  }
}