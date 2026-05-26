import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationResult } from "../models/recipe.model";

export function createRecipeForm(fb: FormBuilder) {
  return fb.group({
    id: ['', [Validators.required]],
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
    ingredients: fb.array([]),
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
    id: '',
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