import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Ingredient, IngredientService } from '@/app/services/ingredient-service';

@Injectable({
  providedIn: 'root'
})
export class IngredientPickerService {
  private search$ = new Subject<string>();
  private ingredients$ = new BehaviorSubject<Ingredient[]>([]);
  // private selected$ = new Subject<Ingredient>();
  // selectedIngredient$ = this.selected$.asObservable();

  // Public streams
  results$ = combineLatest([
    this.search$.pipe(
      startWith(''),
      debounceTime(250),
      distinctUntilChanged()
    ),
    this.ingredients$
  ]).pipe(
    map(([term, ingredients]) => this.filterIngredients(term, ingredients))
  );


  constructor(private ingredientService: IngredientService) {
    this.ingredientService.loadIngredients();
    this.ingredientService.getIngredients().subscribe(items => {
      this.ingredients$.next(items);
    });
  }

  search(term: string): void {
    this.search$.next(term ?? '');
  }

  // select(item: Ingredient): void {
  //   this.selected$.next(item);
  // }

  private filterIngredients(term: string, ingredients: Ingredient[]): Ingredient[] {
    const normalized = term.trim().toLowerCase();

    if (!normalized) return [];

    return ingredients
      .filter(item =>
        item.name.toLowerCase().includes(normalized) ||
        item.id.toString().includes(normalized)
      )
      .slice(0, 10);
  }
}