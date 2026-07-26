import { SubRecipeForm } from '@/app/forms/recipe.form';
import { SubRecipe } from '@/app/models/recipe.model';
import { RecipeService } from '@/app/services/recipe.service';
import { ToastService } from '@/app/services/toast.service';
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
  isSearching: boolean = false;

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

  constructor(
    private recipeService: RecipeService,
    private toastService: ToastService
  ) { }

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

  onRecipeIdChange(e: any, index: number) {
    const control = this.subRecipesArray.at(index).get('subRecipeId');
    control?.setValue(e.detail.value)
  }

  recipeIdValidation(): boolean {
    return this.actuellStatus.exists;
  }

  async isExisted(index: number): Promise<{ exists: boolean; data: any }> {
    const value_id = this.subRecipesArray.at(index).get('subRecipeId')?.value;
    this.isSearching = true;

    if (this.isAlreadyAddedById(value_id)) {
      this.toastService.error('duplicate');
      this.isSearching = false;
      return { exists: false, data: null };
    }

    try {
      const result = await this.recipeService.isExist(value_id!);
      // this.actuellStatus = result;
      this.actuellStatus = { ...result };
      return result;

    } catch (error) {
      this.toastService.error('Something went wrong');
      return { exists: false, data: null };
    } finally {
      this.isSearching = false;
    }
  }

  addSubRecipe(index: number) {
    // 🔁 if already added → remove
    if (this.isAlreadyAdded(this.actuellStatus.data?.name)) {
      this.removeSubRecipe(index);
      return;
    }

    const payload = this.createPayload(index);
    if (payload && this.actuellStatus.exists) {
      this.addToSubRecipesArray(payload); // ✅ mark as added
      this.resetField(index);
    }
  }

  removeSubRecipe(index: number) {
    this.subRecipesArray.removeAt(index);
  }

  isAlreadyAdded(name?: string | null): boolean {
    if (name === null || name === undefined) return false;
    return this.subRecipesArray.value.some(
      item => item.name === name
    );
  }

  private isAlreadyAddedById(id?: string | null): boolean {
    if (id === null || id === undefined) return false;
    return this.subRecipesArray.value.some(
      item =>
        item.subRecipeId === id && this.isAlreadyAdded(item.name) // if name is valid means the item is loaded from Cloud-DB
    );
  }

  private createPayload(index: number): SubRecipe | null {
    // const value_id = this.subRecipesArray.at(this.index).get('subRecipeId')?.value;
    const value_id = this.actuellStatus.data?.id ?? null;
    const value_name = this.actuellStatus.data?.title ?? null;
    const value_qty = this.subRecipesArray.at(index).get('qty')?.value;
    if (!value_qty) return null;

    const value_unit = this.subRecipesArray.at(index).get('unit')?.value;
    if (!value_unit) return null;

    const value_note = this.subRecipesArray.at(index).get('note')?.value;
    const payload = {
      subRecipeId: value_id!,
      name: value_name,
      qty: value_qty,
      unit: value_unit,
      note: value_note ?? ''
    }
    return payload;
  }

  private resetField(index: number): void {
    this.subRecipesArray.at(index).reset();
    this.actuellStatus = { exists: false, data: null }; // default value
  }

  private addToSubRecipesArray(sub: SubRecipe): void {
    this.addSubRecipeEvent.emit({ ...sub });
  }

  fieldVerfication(index: number): boolean {
    const group = this.subRecipesArray.at(index)
    const value_qty = group.get('qty')?.value;
    const value_unit = group.get('unit')?.value;
    const hasQty = value_qty !== null && value_qty !== undefined && value_qty !== 0;
    const hasUnit = value_unit !== null && value_unit !== undefined && value_unit !== '';
    const isValid = this.actuellStatus.exists && hasQty && hasUnit;
    const isAlreadyAdded = this.isAlreadyAdded(this.subRecipesArray.at(index).value.name);
    return isValid || isAlreadyAdded;
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByControl(index: number, control: any) {
    return control;
  }
}