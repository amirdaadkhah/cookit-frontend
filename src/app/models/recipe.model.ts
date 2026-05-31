export type RecipeCategory = 'dessert' | 'breakfast' | 'snack' | 'food' | 'drink';


export interface RecipeIngredient {
  ingredientId: number | null;
  name: string | null;
  isMain: boolean;
  optional: boolean;
  qty: number | null;
  unit: string;
  note: string | null;
  substitutes: number[];
}

export interface RecipePayload {
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

export type ValidationResult = {
  message: string;
  color: 'warning' | 'danger' | 'success';
};