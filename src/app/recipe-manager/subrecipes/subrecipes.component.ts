import { SubRecipeForm } from '@/app/forms/recipe.form';
import { SubRecipe } from '@/app/models/recipe.model';
import { RecipeService } from '@/app/services/recipe.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-subrecipes',
  templateUrl: './subrecipes.component.html',
  styleUrls: ['./subrecipes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ]
})
export class SubrecipesComponent {
  @Input({ required: true }) subRecipesArray!: FormArray<SubRecipeForm>;
  @Output() addSubRecipeEvent = new EventEmitter<SubRecipe>();

  isChecked: boolean = false;
  actuellStatus: { exists: boolean; data: any } = { exists: false, data: null };
  index: number = 0;

  readonly unitOptions: string[] = [
    'pcs',
    'g',
    'kg',
    'ml',
    'l',
    'tsp',
    'tbsp',
    'cup',
  ];

  constructor(private recipeService: RecipeService) { }

  onToggleChange(e: any) {
    this.isChecked = e.detail.checked;
    if (this.isChecked && this.subRecipesArray.length === 0) {
      this.addSubRecipeEvent.emit(this.createDefaultSubRecipe());
    }
  }

  private createDefaultSubRecipe(): SubRecipe {
    return {
      subRecipeId: null,
      name: null,
      qty: null,
      unit: 'pcs',
      note: null
    };
  }

  onRecipeIdChange(e: any) {
    const control = this.subRecipesArray.at(this.index).get('subRecipeId');
    control?.setValue(e.detail.value)
  }

  recipeIdValidation(): boolean {
    return this.actuellStatus.exists;
  }

  async isExisted(): Promise<{ exists: boolean; data: any }> {
    const value_id = this.subRecipesArray.at(this.index).get('subRecipeId')?.value;

    try {
      const result = await this.recipeService.isExist(value_id!);
      this.actuellStatus = result;
      return result;
    } catch (error) {
      return { exists: false, data: null };
      // await this.showToast('Something went wrong', 'danger');
    } finally {
      console.log('### new data: ', this.actuellStatus.data)
    }
  }

  addSubRecipe() {
    // TODO: RECIPE VALIDATION BEFORE ADDING
    // const value_id = this.subRecipesArray.at(this.index).get('subRecipeId')?.value;
    const value_id = this.actuellStatus.data?.id ?? null;
    const value_name = this.actuellStatus.data?.title ?? null;
    const value_qty = this.subRecipesArray.at(this.index).get('qty')?.value;
    const value_unit = this.subRecipesArray.at(this.index).get('unit')?.value;
    const value_note = this.subRecipesArray.at(this.index).get('note')?.value;

    if (this.actuellStatus.data.title && value_qty && value_unit) {
      this.addToSubRecipesArray({
        subRecipeId: value_id!,
        name: value_name,
        qty: value_qty,
        unit: value_unit,
        note: value_note ?? ''
      });
      this.subRecipesArray.at(this.index).reset();
      this.actuellStatus = { exists: false, data: null }; // default value
    }
  }

  private addToSubRecipesArray(sub: SubRecipe): void {
    this.addSubRecipeEvent.emit({ ...sub });
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByControl(index: number, control: any) {
    return control;
  }
}