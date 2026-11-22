export interface RecipeSearchResult {
  recipe_id: string;
  title: string;
  category: string[];
  match_count: number;
  main_match_count: number;
  missing_count: number;
  score: number;
  nutrition: RecipeNutrition,
  tags: string[], 
  times: RecipeCookingTimes,
  vegan: boolean,
  vegetarian: boolean
}

export interface RecipeIngredient {
  name: string;
  amount?: string;
}

export interface RecipeStep {
  order: number;
  description: string;
}

export interface RecipeNutrition {
  kcal: number;
  portion: string;
  protein: number
}

export interface RecipeCookingTimes {
  cookMin: number;
  prepMin: number;
  totalMin: number
}

export type RecipeDifficulty =
  | 'Easy'
  | 'Medium'
  | 'Hard';