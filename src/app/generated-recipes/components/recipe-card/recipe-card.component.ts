import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeDifficulty, RecipeSearchResult } from '../../model/generated-recipe.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DifficultyRecipeBadgeComponent } from '@/app/shared/difficulty-recipe-badge/difficulty-recipe-badge.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    DifficultyRecipeBadgeComponent
  ]
})
export class RecipeCardComponent implements OnInit {
  @Input({ required: true }) recipe!: RecipeSearchResult;
  @Input() selected = false;
  @Output() recipeSelected = new EventEmitter<RecipeSearchResult>();

  constructor() { }

  ngOnInit(): void {
    // console.log('Recipe received:', this.recipe);
  }

  selectRecipe(): void {
    this.recipeSelected.emit(this.recipe);
  }

  getImage(): string {
    return 'assets/images/recipe-hero.png'; // only as test, must be called from backend
  }

  getDifficulty(): RecipeDifficulty {
    return 'Easy'; // only for design, must be implemented as user review
  }

  getRating(): string {
    return '4.8 (96)'; // only for design, must be implemented as user review
  }
}
