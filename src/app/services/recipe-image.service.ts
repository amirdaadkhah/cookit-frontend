import { environment } from '@/environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeImageService {
  dummy_image: string = "./assets/images/dummy_food.png";

  getImage(id: string | null): string {
    if (!id) {
      return this.dummy_image;
    }
    return `${environment.supabaseURL}/storage/v1/object/public/recipe-images/${id}/main.png`;
  }
}
