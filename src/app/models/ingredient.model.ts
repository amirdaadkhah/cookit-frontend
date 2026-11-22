export interface Ingredient {
  id: number;
  name: string;
  category: string;
  image: string;
  type?: string; // For meat: 'lamb', 'beef', etc.
  parts?: IngredientPart[]; // optional parts if this ingredient has sub-items
}

export interface IngredientPart {
  id: number;
  name: string;
  image: string;
}