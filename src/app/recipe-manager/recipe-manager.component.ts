import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { TagsSearchService } from '../services/tags-search.service';
import { IngredientBlockComponent } from './ingredient-block/ingredient-block.component';
import { MediaBlockComponent } from './media-block/media-block.component';
import { RecipeService } from '../services/recipe.service';

type RecipeCategory = 'dessert' | 'breakfast' | 'snack' | 'lunch' | 'dinner' | 'drink';
interface RecipeIngredient {
  ingredientId: number | null;
  isMain: boolean;
  optional: boolean;
  qty: number | null;
  unit: string;
  note: string | null;
  subtitute: number[];
}

interface RecipePayload {
  id: string;
  title: string;
  category: string[];
  diet: {
    vegan: boolean;
    vegetarian: boolean;
  };
  isWarm: boolean;
  times: {
    prepMin: number | null;
    cookMin: number | null;
    totalMin: number | null;
  };
  nutrition: {
    portion: string | null;
    kcal: string | null;
    protein: string | null;
  };
  ingredients: RecipeIngredient[];
  media: {
    instagram: string | null;
    tiktok: string | null;
    youtube: string | null;
    webpage: string | null;
  };
  tags: string[];
  origin: string | null;
  steps: string[];
  updatedAt: string;
}

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
    'lunch',
    'dinner',
    'drink',
  ];

  readonly tagSearch = new FormControl('', { nonNullable: true });
  readonly tagSuggestions = signal<string[]>([]);
  readonly stepInput = new FormControl('', { nonNullable: true });

  readonly recipeForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(120)]],
    category: [[], [Validators.required]],
    diet: this.fb.group({
      vegan: [false],
      vegetarian: [false],
    }),
    isWarm: [false],
    times: this.fb.group({
      prepMin: [null],
      cookMin: [null],
      totalMin: [null],
    }),
    nutrition: this.fb.group({
      portion: [''],
      kcal: [''],
      protein: [''],
    }),
    ingredients: this.fb.array([]),
    media: this.fb.group({
      instagram: [''],
      tiktok: [''],
      youtube: [''],
      webpage: [''],
    }),
    tags: this.fb.array<string>([]),
    origin: [''],
    steps: this.fb.array<string>([]),
    updatedAt: [this.today()],
  });

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

  get tagsArray(): FormArray {
    return this.recipeForm.get('tags') as FormArray;
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
    const Validations = [
      { condition: this.stepsArray.length === 0, message: 'Please add at least one step.', color: 'warning'},
      { condition: this.ingredientBlock.ingredientsArray.length === 0, message: 'Please add at least one ingredient.', color: 'warning'},
      { condition: this.recipeForm.invalid, message: 'Please fix the form errors first.', color: 'danger'},
    ]
    const failed = Validations.find(v => v.condition);
    if (failed) {
      const toast = await this.toastController.create({
        message: failed.message,
        color: failed.color,
        duration: 2000,
        position: 'middle' // 👈 this is what you need
      });
      await toast.present();
      return;
    }

    const payload = this.buildPayload();
    this.recipeService.addRecipe(payload).subscribe({
      next: (res) => {
        this.showToast('Recipe saved successfully.', 'success');
        this.showJsonPreview(payload);
        this.resetForm();
      },
      error: (err) => {
        console.log('Failed to save recipe:', err);
      }
    });
  }

  buildPayload(): RecipePayload {
    const formValue = this.recipeForm.getRawValue();
    return {
      id: formValue.id,
      title: formValue.title,
      category: formValue.category ?? [],
      diet: {
        vegan: formValue.diet.vegan,
        vegetarian: formValue.diet.vegetarian,
      },
      isWarm: !!formValue.isWarm,
      times: {
        prepMin: this.toNullableNumber(formValue.times?.prepMin),
        cookMin: this.toNullableNumber(formValue.times?.cookMin),
        totalMin: this.toNullableNumber(formValue.times?.totalMin),
      },
      nutrition: {
        portion: this.toNullableString(formValue.nutrition?.portion),
        kcal: this.toNullableString(formValue.nutrition?.kcal),
        protein: this.toNullableString(formValue.nutrition?.protein),
      },
      ingredients: (this.ingredientBlock.ingredientsArray.getRawValue() ?? []).map((item: any) => ({
        ingredientId: Number(item.ingredientId),
        isMain: !!item.isMain,
        optional: !!item.optional,
        qty: this.toNullableNumber(item.qty),
        unit: item.unit,
        note: this.toNullableString(item.note),
        subtitute: (item.subtitute ?? [])
          .map((s: number) => String(s).trim())
          .filter((s: string) => !!s),
      })),
      media: {
        instagram: this.toNullableString(this.mediaBlock.mediaFbArray.getRawValue().media?.instagram),
        tiktok: this.toNullableString(this.mediaBlock.mediaFbArray.getRawValue().media?.tiktok),
        youtube: this.toNullableString(this.mediaBlock.mediaFbArray.getRawValue().media?.youtube),
        webpage: this.toNullableString(this.mediaBlock.mediaFbArray.getRawValue().media?.webpage)
      },
      tags: (formValue.tags ?? []).map((t: string) => this.tagsSearchService.normalizeTag(t)),
      origin: this.toNullableString(formValue.origin),
      steps: (formValue.steps ?? []).map((s: string) => s.trim()).filter((s: string) => !!s),
      updatedAt: formValue.updatedAt || this.today(),
    };
  }

  copyGeneratedJson(): void {
    const payload = this.buildPayload();
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    this.showToast('JSON copied to clipboard.', 'success');
  }

  resetForm(): void {
    while (this.ingredientBlock.ingredientsArray.length) this.ingredientBlock.ingredientsArray.removeAt(0);
    while (this.stepsArray.length) this.stepsArray.removeAt(0);
    while (this.tagsArray.length) this.tagsArray.removeAt(0);

    this.recipeForm.reset({
      id: '',
      title: '',
      category: [],
      diet: { vegan: false, vegetarian: false },
      isWarm: false,
      times: { prepMin: null, cookMin: null, totalMin: null },
      nutrition: { portion: '', kcal: '', protein: '' },
      media: { instagram: '', tiktok: '', youtube: '', webpage: '' },
      origin: '',
      updatedAt: this.today(),
    });

    this.tagSearch.setValue('');
    this.stepInput.setValue('');
    this.ingredientBlock.addIngredient();
    this.recipeForm.get('id')?.updateValueAndValidity();
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByControl(index: number, control: any) {
    return control;
  }

  private toNullableString(value: unknown): string | null {
    if (value === null || value === undefined) return null;
    const str = String(value).trim();
    return str === '' ? null : str;
  }

  private toNullableNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    return Number.isNaN(num) ? null : num;
  }

  private today(): Date {
    return new Date();
  }

  private async showToast(
    message: string,
    color: 'success' | 'danger' | 'warning'
  ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2200,
      color,
      position: 'top',
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