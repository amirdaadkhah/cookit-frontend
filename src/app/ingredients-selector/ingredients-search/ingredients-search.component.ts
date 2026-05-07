import { Ingredient, IngredientService } from '@/app/services/ingredient-service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, Output, ViewChild, viewChild } from '@angular/core';
import { IonicModule, IonSearchbar } from '@ionic/angular';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

export type SearchMode = 'all' | 'name' | 'parts';

export interface SearchState {
  query: string;
  mode: SearchMode;
}

export interface SearchOptions {
  mode?: SearchMode;                // default: 'all'
  keepOnlyMatchingParts?: boolean;  // default: true
  sortByRelevance?: boolean;        // default: true
  minQueryLength?: number;          // default: 1
  limit?: number;                   // number of searched items to show
}
@Component({
  selector: 'app-ingredients-search',
  templateUrl: './ingredients-search.component.html',
  styleUrls: ['./ingredients-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class IngredientsSearchComponent implements OnDestroy {
  @ViewChild('searchInput') searchInput!: IonSearchbar;
  @Output() searchChange = new EventEmitter<SearchState>();
  @Output() searchedItemClicked = new EventEmitter<Ingredient>();
  private input$ = new Subject<string>();
  currentQuery = '';
  mode: SearchMode = 'all';
  filtered$ = this.ingredientService.filtered$;
  queryIsEmpty$ = this.ingredientService.queryIsEmpty$;
  trackById = (_: number, ing: { id: number }) => ing.id;
  trackByPartId = (_: number, p: { id: number }) => p.id;
  private destroy$ = new Subject<void>();

  constructor(private ingredientService: IngredientService) {
    this.input$.pipe(
      debounceTime(200), 
      distinctUntilChanged(),
      takeUntil(this.destroy$)).subscribe(value => {
        this.currentQuery = value;
        // IMPORTANT: update service search state here (if you want component to be standalone)
        this.ingredientService.setSearch(this.currentQuery, this.mode);
        // optional: keep Output if parent wants it too
        this.searchChange.emit({ query: this.currentQuery, mode: this.mode });
        this.emit();
      });
  }

  onIngredientClick(ingredient: Ingredient, part?: any) {
    this.currentQuery = '';
    this.ingredientService.setSearch('', this.mode);
    this.searchInput.value = '';
    this.searchedItemClicked.emit(ingredient);
  }

  onInput(event: any) {
    const value = event?.target?.value ?? '';
    this.input$.next(value);
  }

  onModeChange(event: any) {
    this.mode = event.detail.value;
    this.emit();
  }

  onClear() {
    this.currentQuery = '';
    this.emit();
  }

  private emit() {
    this.searchChange.emit({
      query: this.currentQuery,
      mode: this.mode
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();  
  }
}