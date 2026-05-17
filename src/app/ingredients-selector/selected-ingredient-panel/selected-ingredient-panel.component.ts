import { CartItem, IngredientCartService } from '@/app/services/ingredient-cart.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RecipeGenerateMode, RecipesModeSegmentComponent, SEGMENT } from '../recipes-mode-segment/recipes-mode-segment.component';
import { CommonModule } from '@angular/common';
import { RecipeService, SearchForRecipePayload } from '@/app/services/recipe.service';

@Component({
  selector: 'app-selected-ingredient-panel',
  templateUrl: './selected-ingredient-panel.component.html',
  styleUrls: ['./selected-ingredient-panel.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RecipesModeSegmentComponent,
  ]
})
export class SelectedIngredientPanelComponent {
  private selectedSegment: RecipeGenerateMode = SEGMENT.MATCH_ALL;

  constructor(
    public cartService: IngredientCartService,
    private recipeService: RecipeService
  ) { }

  removeFromCart(item: CartItem) {
    this.cartService.remove(item);
  }

  onSegmentChanged(value: RecipeGenerateMode) {
    this.selectedSegment = value;
  }

  generateRecipes() {
    let recipes: any[] = [];
    const payload: SearchForRecipePayload = this.createPayload();
    this.recipeService.searchRecipes(payload).subscribe({
      next: (res) => {
        recipes = res;
        console.log('Recipes:', res);
      },
      error: (err) => {
        console.error('Search failed:', err);
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