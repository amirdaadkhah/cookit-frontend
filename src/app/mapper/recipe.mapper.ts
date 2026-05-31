import { RecipePayload, RecipeIngredient } from "../models/recipe.model";

export class RecipeMapper {
  static toPayload(
    form: any,
    ingredients: RecipeIngredient[],
    media: any,
    tags: any
  ): RecipePayload {
    return {
      title: form.title,
      category: form.category ?? [],
      diet: {
        vegan: form.diet.vegan,
        vegetarian: form.diet.vegetarian,
      },
      isWarm: !!form.isWarm,
      times: {
        prepMin: this.toNullableNumber(form.times?.prepMin),
        cookMin: this.toNullableNumber(form.times?.cookMin),
        totalMin: this.toNullableNumber(form.times?.totalMin),
      },
      nutrition: {
        portion: this.toNullableString(form.nutrition?.portion),
        kcal: this.toNullableString(form.nutrition?.kcal),
        protein: this.toNullableString(form.nutrition?.protein),
      },
      ingredients: ingredients.map(i => this.mapIngredient(i)),
      media: this.mapMedia(media),
      tags: tags,
      origin: this.toNullableString(form.origin),
      steps: (form.steps ?? []).map((s: string) => s.trim()).filter((s: string) => !!s),
      updatedAt: form.updatedAt || new Date(),
    };
  }


  private static mapIngredient(item: any): RecipeIngredient {

    return {
      ingredientId: Number(item.ingredientId),
      name: this.toNullableString(item.name),
      isMain: !!item.isMain,
      optional: !!item.optional,
      qty: this.toNullableNumber(item.qty),
      unit: item.unit,
      note: this.toNullableString(item.note),
      substitutes: (item.substitutes ?? [])
        .map((s: number) => String(s).trim())
        .filter((s: string) => !!s),
    };
  }

  private static mapMedia(media: any) {
    return {
      instagram: this.toNullableString(media?.instagram),
      tiktok: this.toNullableString(media?.tiktok),
      youtube: this.toNullableString(media?.youtube),
      webpage: this.toNullableString(media?.webpage),
    };
  }

  private static toNullableString(value: unknown): string | null {
    const str = String(value ?? '').trim();
    return str || null;
  }

  private static toNullableNumber(value: unknown): number | null {
    const num = Number(value);
    return Number.isNaN(num) ? null : num;
  }
}