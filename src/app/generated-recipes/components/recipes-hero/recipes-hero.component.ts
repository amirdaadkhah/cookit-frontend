import { SearchForRecipePayload } from '@/app/services/recipe.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() recipeId: string = '';
  @Input({ required: true }) payload!: SearchForRecipePayload;
  @Output() back = new EventEmitter<void>();

  constructor(private router: Router) { }

  goBack(): void {
    this.back.emit();
  }

  addMoreIngredients(): void {
    this.router.navigate(['/demo']);
  }
}