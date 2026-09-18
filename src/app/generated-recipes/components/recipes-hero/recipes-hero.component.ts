import { SearchForRecipePayload } from '@/app/services/recipe.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-recipes-hero',
  templateUrl: './recipes-hero.component.html',
  styleUrls: ['./recipes-hero.component.scss'],
  standalone: true,
    imports: [
    CommonModule,
    IonicModule
  ]
})
export class RecipesHeroComponent {
  @Input() recipesCount: number = 0;
  @Input({ required: true }) payload!: SearchForRecipePayload;
  @Output() back = new EventEmitter<void>();

  constructor() {}

  goBack(): void {
    this.back.emit();
  }
}