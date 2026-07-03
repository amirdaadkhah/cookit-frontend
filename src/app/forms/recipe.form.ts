import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SubRecipe, ValidationResult } from "../models/recipe.model";

export function createRecipeForm(fb: FormBuilder) {
  return fb.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    category: [[], [Validators.required]],
    diet: fb.group({
      vegan: [false],
      vegetarian: [false],
    }),
    isWarm: [false],
    times: fb.group({
      prepMin: [null],
      cookMin: [null],
      totalMin: [null],
    }),
    nutrition: fb.group({
      portion: [''],
      kcal: [''],
      protein: [''],
    }),
    ingredients: fb.array<RecipeIngredientForm>([]),
    subRecipes: fb.array<SubRecipeForm>([]),
    media: fb.group({
      instagram: [''],
      tiktok: [''],
      youtube: [''],
      webpage: [''],
    }),
    tags: fb.array<string>([]),
    origin: [''],
    steps: fb.array<string>([]),
    updatedAt: [new Date()],
  });
}

export function getRecipeFormDefaults() {
  return {
    title: '',
    category: [],
    diet: { vegan: false, vegetarian: false },
    isWarm: false,
    times: { prepMin: null, cookMin: null, totalMin: null },
    nutrition: { portion: '', kcal: '', protein: '' },
    media: { instagram: '', tiktok: '', youtube: '', webpage: '' },
    origin: '',
    updatedAt: new Date(),
  };
}

export function validateRecipe(form: FormGroup, steps: FormArray, ingredients: FormArray): ValidationResult | null {
  if (steps.length === 0) {
    return { message: 'Please add at least one step.', color: 'warning' };
  }
  if (ingredients.length === 0) {
    return { message: 'Please add at least one ingredient.', color: 'warning' };
  }
  if (form.invalid) {
    return { message: 'Please fix the form errors first.', color: 'danger' };
  }
  return null;
}

export type RecipeIngredientForm = FormGroup<{
  ingredientId: FormControl<number | null>;
  // name: FormControl<string | null>;
  isMain: FormControl<boolean>;
  optional: FormControl<boolean>;
  qty: FormControl<number | null>;
  unit: FormControl<string | null>;
  note: FormControl<string | null>;
  substitutes: FormArray<FormControl<number>>;
}>;

export type SubRecipeForm = FormGroup<{
  subRecipeId: FormControl<string | null>;
  name: FormControl<string | null>;
  qty: FormControl<number | null>;
  unit: FormControl<string | null>;
  note: FormControl<string | null>;
}>;

export function createIngredientGroup(
  fb: FormBuilder,
  id?: number,
  name?: string
): RecipeIngredientForm {
  return fb.group({
    ingredientId: fb.control<number | null>(id ?? null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    // name: fb.control<string | null>(name ?? null),
    isMain: fb.nonNullable.control(false),
    optional: fb.nonNullable.control(false),
    qty: fb.control<number | null>(null, {
      validators: [Validators.required],
    }),
    unit: fb.control('pcs', { validators: [Validators.required] }),
    note: fb.control<string | null>(null),
    substitutes: fb.array<FormControl<number>>([]),
  });
}

export function createSubRecipeGroup(
  fb: FormBuilder,
  sub: SubRecipe
): SubRecipeForm {
  return fb.group({
    subRecipeId: fb.control<string | null>(sub.subRecipeId ?? null, {
      validators: [Validators.required, Validators.min(1)], // my own validator
    }),
    name: fb.control<string | null>(sub.name ?? null),
    qty: fb.control<number | null>(sub.qty ?? null, {
      validators: [Validators.required],
    }),
    unit: fb.control(sub.unit ?? 'pcs', { validators: [Validators.required] }),
    note: fb.control<string | null>(sub.note ?? null)
  });
}

export function createIngredientsArray(fb: FormBuilder): FormArray {
  return fb.array([]);
}