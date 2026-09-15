import { Component, Input, OnInit } from '@angular/core';
import { RecipeDifficulty } from '../../model/generated-recipe.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RecipePayload } from '@/app/models/recipe.model';
import { DifficultyRecipeBadgeComponent } from '@/app/shared/difficulty-recipe-badge/difficulty-recipe-badge.component';
import { IngredientService } from '@/app/services/ingredient-service';

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
export class RecipeDetailComponent implements OnInit {
  @Input({ required: true }) recipe!: RecipePayload;

  constructor(private ingredientService: IngredientService) {
    this.ingredientService.loadIngredients();
  }

  ngOnInit(): void {
    // this.ingredientService.loadIngredients();
  }

  getImage(): string {
    return 'assets/images/recipe-hero.png';
  }

  getDifficulty(): RecipeDifficulty {
    return 'Hard';
  }

  getIngredientName(id: number): string {
    return this.ingredientService.getIngredientNameById(id);
  }
}