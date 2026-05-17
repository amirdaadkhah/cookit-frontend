import { IngredientPickerService } from '@/app/services/ingredient-picker.service';
import { Ingredient, IngredientPart } from '@/app/services/ingredient-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  ingredientFbArray = this.fb.group({
    ingredients: this.fb.array([])
  });

  ingredientsResults$ = this.ingredientPickerService.results$;
  activeInput: {
    type: 'ingredient' | 'substitute';
    i: number;
    j?: number;
  } | null = null;

  constructor(
    private ingredientPickerService: IngredientPickerService,
    private readonly fb: FormBuilder,
  ) {
    this.addIngredient(); // one block of 'add ingredients' is showing as default
  }

  get ingredientsArray(): FormArray {
    return this.ingredientFbArray.get('ingredients') as FormArray;
  }

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
    return this.ingredientsArray.at(ingredientIndex).get('subtitute') as FormArray;
  }

  onSubstitutionsSearch(event: any, i: number, j: number) {
    const value = event.detail?.value ?? '';
    this.activeInput = {
      type: 'substitute',
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

  addIngredient(id?: number, name?: string): void {
    this.ingredientsArray.push(this.createIngredientGroup(id, name));
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

  private createIngredientGroup(id?: number, name?: string): FormGroup {
    return this.fb.group({
      ingredientId: [id, [Validators.required, Validators.min(1)]],
      name: name,
      isMain: [false],
      optional: [false],
      qty: [null, [Validators.required]],
      unit: ['pcs', Validators.required],
      note: [''],
      subtitute: this.fb.array<string>([]),
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByControl(index: number, control: any) {
    return control;
  }
}