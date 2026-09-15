import { RecipeDifficulty } from '@/app/generated-recipes/model/generated-recipe.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-difficulty-recipe-badge',
  templateUrl: './difficulty-recipe-badge.component.html',
  styleUrls: ['./difficulty-recipe-badge.component.scss'],
  standalone: true,
})
export class DifficultyRecipeBadgeComponent {
  @Input({ required: true }) difficulty!: RecipeDifficulty;

  constructor() { }
}
