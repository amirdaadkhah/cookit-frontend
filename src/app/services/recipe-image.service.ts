import { environment } from '@/environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeImageService {

  getImage(id: string | null): string {
    return `${environment.supabaseURL}/storage/v1/object/public/recipe-images/${id}/main.png`;
  }
}
