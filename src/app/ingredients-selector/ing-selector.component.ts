import { Component } from '@angular/core';
import { Ingredient, IngredientPart, IngredientService } from '../services/ingredient-service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { IngredientsSearchComponent, SearchState } from './ingredients-search/ingredients-search.component';
import { RecipeGenerateMode, RecipesModeSegmentComponent, SEGMENT } from './recipes-mode-segment/recipes-mode-segment.component';
import { RecipeService } from '../services/recipe.service';

export interface CartItem {
  ingredient: Ingredient;
  part?: IngredientPart;
  quantity: number;
}

@Component({
  selector: 'app-ing-selector',
  templateUrl: './ing-selector.component.html',
  styleUrls: ['./ing-selector.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    IngredientsSearchComponent,
    RecipesModeSegmentComponent
  ]
})
export class IngredientsSelectorComponent {
  categories: string[] = [];
  groupedIngredients: { [category: string]: Ingredient[]} = {};
  selectedCategory: string = '';
  selectedPart: Ingredient | null = null;
  cart: CartItem[] = [];
  private ingredients$: Observable<Ingredient[]> = new Observable();
  private selectedSegment: RecipeGenerateMode = SEGMENT.MATCH_ALL;


  constructor(
    private ingredientService: IngredientService, 
    private recipeService: RecipeService
  ) {
    this.ingredientService.loadIngredients();
    this.ingredients$ = this.ingredientService.ingredients$;
    this.ingredients$.subscribe(ingredients => {
      if (!ingredients || ingredients.length === 0) return; // avoid empty emission

      this.categories = Array.from(new Set(ingredients.map(i => i.category)));
      this.selectedCategory = this.categories[0];
      this.groupedIngredients = {};//
      this.categories.forEach(cat => {
        this.groupedIngredients[cat] = ingredients.filter(i => i.category === cat);
      })
    })
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  addIngredient(ingredient: Ingredient) {
    const hasPart = ingredient.parts && ingredient.parts.length > 0;
    if (hasPart) {
      this.selectedPart = ingredient; // open part selection modal
    } else {
      this.addToCart({ ingredient, quantity: 1 });
    }
  }

  addIngredientPartToCart(part: IngredientPart) {
    if (this.selectedPart) {
      this.addToCart({ ingredient: this.selectedPart, part, quantity: 1 });
      this.selectedPart = null; // close selection
    }
  }

  private addToCart(item: CartItem) {
    // Check if already exists
    const existing = this.cart.find(c =>
      c.ingredient.id === item.ingredient.id &&
      ((c.part?.id ?? 0) === (item.part?.id ?? 0))
    );
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push(item);
    }
  }

  removeFromCart(item: CartItem) {
    this.cart = this.cart.filter(c =>
      !(c.ingredient.id === item.ingredient.id && (c.part?.id ?? 0) === (item.part?.id ?? 0))
    );
  }

  cancelPartSelection() {
    this.selectedPart = null;
  }

  onSearchChange(event: SearchState) {
    this.ingredientService.setSearch(event.query, event.mode);
  }

  selectedSearchedItem(event: Ingredient) {
    if (event.parts && event.parts.length > 0) {
      const part: IngredientPart = event.parts[0];
      this.addToCart({ ingredient: event, part, quantity: 1 });
    } else {
      this.addToCart({ ingredient: event, quantity: 1 });
    }
  }

  onSegmentChanged(value: RecipeGenerateMode) {
    this.selectedSegment = value;
  }

  generateRecipes() {
    // this.recipeService.getIngredients()
    // .subscribe(data => {
    //   console.log(data);
    // });

    const selectedIds: number[] = [];
    for(const item of this.cart) {
      const id = item.part?.id ?? item.ingredient.id;
      if (id != null) {
        selectedIds.push(id);
      }
    }

    let recipes: any[] = [];
    const payload = {
      ingredientIds: selectedIds,
      mode: this.selectedSegment,
      limit: 10
    }
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
}
