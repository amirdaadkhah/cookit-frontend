import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient, IngredientPart } from './ingredient-service';

export interface CartItem {
  ingredient: Ingredient;
  part?: IngredientPart;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class IngredientCartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();
  private segmentSubject = new BehaviorSubject<string>('default'); // TODO: set real default value
  segment$ = this.segmentSubject.asObservable();

  get cart(): CartItem[] {
    return this.cartSubject.value;
  }

  add(item: CartItem) {
    this.cartSubject.next([...this.cart, item]);
  }

  remove(item: CartItem) {
    this.cartSubject.next(
      this.cart.filter(i => i !== item)
    );
    // this.cart.filter(c => !(c.ingredient.id === item.ingredient.id && (c.part?.id ?? 0) === (item.part?.id ?? 0)));
  }

  clear() {
    this.cartSubject.next([]);
  }

  setSegment(value: string) {
    this.segmentSubject.next(value);
  }
}
