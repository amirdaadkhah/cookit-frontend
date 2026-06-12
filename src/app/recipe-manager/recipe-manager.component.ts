import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { IngredientBlockComponent } from './ingredient-block/ingredient-block.component';
import { MediaBlockComponent } from './media-block/media-block.component';
import { RecipeService } from '../services/recipe.service';
import { RecipeMapper } from '../mapper/recipe.mapper';
import { RecipeCategory, RecipePayload } from '../models/recipe.model';
import { createRecipeForm, getRecipeFormDefaults, validateRecipe, createIngredientGroup } from '../forms/recipe.form';
import { StepsBlockComponent } from './steps-block/steps-block.component';
import { TagsBlockComponent } from './tags-block/tags-block.component';
import { TagsSearchService } from '../services/tags-search.service';

@Component({
  selector: 'app-recipe-manager',
  templateUrl: './recipe-manager.component.html',
  styleUrls: ['./recipe-manager.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    IngredientBlockComponent,
    MediaBlockComponent,
    StepsBlockComponent,
    TagsBlockComponent
  ]
})
export class RecipeManagerComponent {
  // TODO: read from backend/DB
  readonly categoryOptions: RecipeCategory[] = [
    'dessert',
    'breakfast',
    'snack',
    'food',
    'drink',
    'salad',
    'dressing'
  ];

  readonly tagSearch = new FormControl('', { nonNullable: true });
  readonly tagSuggestions = signal<string[]>([]);
  readonly stepInput = new FormControl('', { nonNullable: true });
  readonly recipeForm: FormGroup = createRecipeForm(this.fb);

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastController: ToastController,
    private readonly alertController: AlertController,
    private recipeService: RecipeService,
    private tagService: TagsSearchService
  ) {
    if (this.ingredientsArray.length === 0) {
      this.addIngredient();
    }
  }

  get ingredientsArray(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get mediaGroup(): FormGroup {
    return this.recipeForm.get('media') as FormGroup;
  }

  get stepsArray(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  get tagsArray(): FormArray {
    return this.recipeForm.get('tags') as FormArray;
  }

  addIngredient(id?: number, name?: string): void {
    this.ingredientsArray.push(createIngredientGroup(this.fb, id, name));
  }

  async saveRecipe(): Promise<void> {
    this.recipeForm.markAllAsTouched();
    const error = validateRecipe(this.recipeForm, this.stepsArray, this.ingredientsArray);
    if (error) {
      this.showToast(error.message, 2200, error.color, 'middle');
      return;
    }
    const payload = this.buildPayload();
    this.recipeService.addRecipe(payload).subscribe({
      next: (res) => this.onSaveSuccess(payload),
      error: (err) => this.onSaveError(err),
    });
  }

  buildPayload(): RecipePayload {
    const formValue = this.recipeForm.getRawValue();
    const payload = RecipeMapper.toPayload(
      formValue,
      this.ingredientsArray.getRawValue() ?? [],
      this.mediaGroup.getRawValue().media,
      (this.tagsArray.getRawValue() ?? []).map((t: string) => this.normalizeTag(t))
    );
    return payload;
  }

  private async onSaveSuccess(payload: RecipePayload) {
    this.showToast('Recipe saved successfully.', 2200, 'success', 'top');
    // this.showJsonPreview(payload);
    const tags: string[] = this.tagsArray.getRawValue();
    this.tagService.addNewTagsToDB(tags).subscribe({
      next: () => {
        this.showSuccessSavedAlert();
      },
      error: err => {
        console.error(err);
      }
    });
    this.resetForm();
  }

  private onSaveError(err: any) {
    console.log('Failed to save recipe:', err);
    console.error('Failed to save recipe:', err);
  }

  copyGeneratedJson(): void {
    const payload = this.buildPayload();
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    this.showToast('JSON copied to clipboard.', 2200, 'success', 'top');
  }

  resetForm(): void {
    this.resetFormState();
    this.resetUiState();
    this.addIngredient(); // one block of 'add ingredients' is showing as default
    this.recipeForm.get('id')?.updateValueAndValidity();
  }

  private resetFormState() {
    this.ingredientsArray.clear();
    this.stepsArray.clear();
    this.tagsArray.clear();
  }

  private resetUiState() {
    this.recipeForm.reset(getRecipeFormDefaults());
    this.tagSearch.setValue('');
    this.stepInput.setValue('');
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByControl(index: number, control: any) {
    return control;
  }

  private async showToast(message: string, duration: number, color: 'success' | 'danger' | 'warning', position: 'top' | 'middle'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: duration,
      color,
      position: position,
    });
    await toast.present();
  }

  private async showSuccessSavedAlert() {
    const alert = await this.alertController.create({
      header: 'Recipe Saved',
      message: `Recipe and new Tags are successfully saved!`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  private async showJsonPreview(payload: RecipePayload): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Recipe JSON',
      message: `<pre style="text-align:left;white-space:pre-wrap;font-size:12px;">${this.escapeHtml(
        JSON.stringify(payload, null, 2)
      )}</pre>`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  private escapeHtml(value: string): string {
    return value
      .replace('&', '&amp;')
      .replace('<', '&lt;')
      .replace('>', '&gt;')
      .replace('"', '&quot;')
      .replace("'", '&#039;');
  }

  normalizeTag(tag: string): string {
    return tag.trim().toLowerCase().replace(/\s+/g, '_');
  }
}