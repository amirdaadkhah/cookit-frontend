import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-generate-recipe-button',
  templateUrl: './generate-recipe-button.component.html',
  styleUrls: ['./generate-recipe-button.component.scss'],
  standalone: true,
    imports: [
    CommonModule,
    IonicModule
  ],
})
export class GenerateRecipeButtonComponent {
  @Input() disabled = false;
  @Input() isLoading = false;
  @Output() generate = new EventEmitter<void>();

  onClick(): void {
    if (this.disabled || this.isLoading) {
      return;
    }

    this.generate.emit();
  }
}
