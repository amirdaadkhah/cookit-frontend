import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeDifficulty, RecipeSearchResult } from '../../model/generated-recipe.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DifficultyRecipeBadgeComponent } from '@/app/shared/difficulty-recipe-badge/difficulty-recipe-badge.component';
import { RecipeImageService } from '@/app/services/recipe-image.service';

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
  coverImage: string = '';

  constructor(
    private recipeImageService: RecipeImageService
  ) { 
  }

  ngOnInit(): void {
    this.coverImage = this.recipeImageService.getImage(this.recipe.recipe_id);
  }

  selectRecipe(): void {
    this.recipeSelected.emit(this.recipe);
  }

  getDifficulty(): RecipeDifficulty {
    return 'Easy'; // only for design, must be implemented as user review
  }

  getRating(): string {
    return '4.8 (96)'; // only for design, must be implemented as user review
  }
}
