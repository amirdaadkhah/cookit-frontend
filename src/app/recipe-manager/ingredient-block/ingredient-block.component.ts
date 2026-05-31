import { RecipeIngredientForm } from '@/app/forms/recipe.form';
import { IngredientPickerService } from '@/app/services/ingredient-picker.service';
import { Ingredient, IngredientPart } from '@/app/services/ingredient-service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ingredient-block',
  templateUrl: './ingredient-block.component.html',
  styleUrls: ['./ingredient-block.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class IngredientBlockComponent {
  @Input({ required: true }) ingredientsArray!: FormArray<RecipeIngredientForm>;
  @Output() addIngredientEvent = new EventEmitter<{ id?: number; name?: string }>();

  readonly unitOptions: string[] = [
    'pcs',
    'g',
    'kg',
    'ml',
    'l',
    'tsp',
    'tbsp',
    'cup',
    'pinch',
  ];

  ingredientsResults$ = this.ingredientPickerService.results$;
  activeInput: {
    type: 'ingredient' | 'substitutes';
    i: number;
    j?: number;
  } | null = null;

  constructor(private ingredientPickerService: IngredientPickerService) { }

  get ingredients(): any[] {
    return this.ingredientsArray.value;
  }

  onIngredientsSearch(event: any, index: number) {
    const value = event.detail?.value ?? '';
    this.activeInput = { // to manage search lists
      type: 'ingredient',
      i: index
    };
    this.ingredientPickerService.search(value);
  }

  onIngredientsSelected(item: Ingredient, i: number, part?: IngredientPart): void {
    // 1. set ID into form (this is what gets saved in JSON)
    const control = this.ingredientsArray.at(i).get('ingredientId');
    const value = part?.id ? part.id : item.id
    control?.setValue(value)
    this.activeInput = null; // hide dropdown search list
  }

  ingredientSubstitutes(ingredientIndex: number): FormArray {
    return this.ingredientsArray.at(ingredientIndex).get('substitutes') as FormArray;
  }

  onSubstitutionsSearch(event: any, i: number, j: number) {
    const value = event.detail?.value ?? '';
    this.activeInput = {
      type: 'substitutes',
      i: i, j: j
    };
    this.ingredientPickerService.search(value);
  }

  onSubstitutionSelected(item: Ingredient, i: number, j: number, part?: IngredientPart): void {
    const formArray = this.ingredientSubstitutes(i);
    const control = formArray.at(j);
    const value = part?.id ? part.id : item.id
    control.setValue(value); // 1. set value to input
    this.activeInput = null; // hide dropdown search list
  }

  getSubstituteControl(i: number, j: number): FormControl<number> {
    return (this.ingredientsArray.at(i).get('substitutes') as FormArray<FormControl<number>>).at(j);
  }

  addIngredient(id?: number, name?: string): void {
    this.addIngredientEvent.emit({ id, name });
  }

  removeIngredient(index: number): void {
    this.ingredientsArray.removeAt(index);
  }

  addSubstitute(index: number): void {
    this.ingredientSubstitutes(index).push(new FormControl(''));
  }

  removeSubstitute(ingredientIndex: number, substituteIndex: number): void {
    this.ingredientSubstitutes(ingredientIndex).removeAt(substituteIndex);
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByControl(index: number, control: any) {
    return control;
  }
}