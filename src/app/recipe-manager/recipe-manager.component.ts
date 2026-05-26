import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { TagsSearchService } from '../services/tags-search.service';
import { IngredientBlockComponent } from './ingredient-block/ingredient-block.component';
import { MediaBlockComponent } from './media-block/media-block.component';
import { RecipeService } from '../services/recipe.service';
import { RecipeMapper } from '../mapper/recipe.mapper';
import { RecipeCategory, RecipePayload } from '../models/recipe.model';
import { createRecipeForm, getRecipeFormDefaults, validateRecipe } from '../forms/recipe.form';

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
    MediaBlockComponent
  ]
})
export class RecipeManagerComponent {
  @ViewChild(IngredientBlockComponent)
  ingredientBlock!: IngredientBlockComponent;
  @ViewChild(MediaBlockComponent)
  mediaBlock!: MediaBlockComponent;

  readonly categoryOptions: RecipeCategory[] = [
    'dessert',
    'breakfast',
    'snack',
    'food',
    'drink',
  ];
  readonly tagSearch = new FormControl('', { nonNullable: true });
  readonly tagSuggestions = signal<string[]>([]);
  readonly stepInput = new FormControl('', { nonNullable: true });
  readonly recipeForm: FormGroup = createRecipeForm(this.fb);

  constructor(
    private readonly fb: FormBuilder,
    private tagsSearchService: TagsSearchService,
    private readonly toastController: ToastController,
    private readonly alertController: AlertController,
    private recipeService: RecipeService
  ) {
    this.setupTagSearch();
  }

  get stepsArray(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }



  addStep(): void {
    const value = this.stepInput.value.trim();
    if (!value) return;

    this.stepsArray.push(new FormControl(value, Validators.required));
    this.stepInput.setValue('');
  }

  removeStep(index: number): void {
    this.stepsArray.removeAt(index);
  }

  moveStepUp(index: number): void {
    if (index === 0) return;

    const current = this.stepsArray.at(index).value;
    const previous = this.stepsArray.at(index - 1).value;

    this.stepsArray.at(index - 1).setValue(current);
    this.stepsArray.at(index).setValue(previous);
  }

  moveStepDown(index: number): void {
    if (index >= this.stepsArray.length - 1) return;

    const current = this.stepsArray.at(index).value;
    const next = this.stepsArray.at(index + 1).value;

    this.stepsArray.at(index + 1).setValue(current);
    this.stepsArray.at(index).setValue(next);
  }

  get tagsArray(): FormArray {
    return this.recipeForm.get('tags') as FormArray;
  }

  private setupTagSearch(): void {
    this.tagSearch.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map(value => {
          const query = value.trim();
          return this.tagsSearchService.searchTags(query);
        })
      )
      .subscribe(tags => {
        const selected = this.tagsArray.value as string[];
        this.tagSuggestions.set(
          tags.filter(tag => !selected.includes(tag))
        );
      });
  }

  addTagFromInput(): void {
    const currentTags = this.tagsArray.value as string[];
    this.tagsSearchService.addNewTagsToDB(currentTags);
    this.tagSearch.setValue('');
  }

  addSuggestedTag(tag: string): void {
    const currentTags = this.tagsArray.value as string[];
    if (!currentTags.includes(tag)) {
      this.tagsArray.push(new FormControl(tag));
    }
    this.tagSearch.setValue('');
    this.tagSuggestions.set([]);
  }

  removeTag(index: number): void {
    this.tagsArray.removeAt(index);
  }

  async saveRecipe(): Promise<void> {
    this.recipeForm.markAllAsTouched();
    const error = validateRecipe(this.recipeForm, this.stepsArray, this.ingredientBlock.ingredientsArray);
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
      this.ingredientBlock.ingredientsArray.getRawValue() ?? [],
      this.mediaBlock.mediaFbArray.getRawValue().media,
      (formValue.tags ?? []).map((t: string) => this.tagsSearchService.normalizeTag(t))
    );
    return payload;
  }

  private async onSaveSuccess(payload: RecipePayload) {
    this.showToast('Recipe saved successfully.', 2200, 'success', 'top');
    this.showJsonPreview(payload);
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
    this.ingredientBlock.addIngredient();
    this.recipeForm.get('id')?.updateValueAndValidity();
  }

  private resetFormState() {
    this.ingredientBlock.ingredientsArray.clear();
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
}