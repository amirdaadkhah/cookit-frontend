import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';
import { SearchMode, SearchOptions, SearchState } from '../ingredients-selector/ingredients-search/ingredients-search.component';
import { HttpClient } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private readonly jsonURL = 'assets/db/ingredients.json';
  private ingredientsSubject = new BehaviorSubject<Ingredient[]>([]);
  ingredients$ = this.ingredientsSubject.asObservable();
  private searchSubject = new BehaviorSubject<SearchState>({ query: '', mode: 'all'});
  readonly search$ = this.searchSubject.asObservable();
  readonly queryIsEmpty$ = this.search$.pipe(
    map(s => !s.query || s.query.trim().length < 1)
  );
  private readonly defaultSearchOptions: Required<SearchOptions> = {
    mode: 'all',
    keepOnlyMatchingParts: true,
    sortByRelevance: true,
    minQueryLength: 2, // do search for more than 2 chars
    limit: 7          // top matches
  };
  /** UI subscribes to this */
  readonly filtered$ = combineLatest([this.ingredients$, this.search$]).pipe(
    map(([items, state]) => 
      this.search(items, state.query, { ...this.defaultSearchOptions, mode: state.mode })), 
    shareReplay({ bufferSize: 1, refCount: true})
  );
  
  constructor(
    private http: HttpClient
  ) {}

  loadIngredients() {
    this.ingredientsSubject.next([]);
    this.http.get<Ingredient[]>(this.jsonURL).subscribe({
      next: (data) => this.ingredientsSubject.next(data ?? []),
      error: () => this.ingredientsSubject.next([]),
    });
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.ingredients$;
  }

  setSearch(query: string, mode?: SearchMode) {
    this.searchSubject.next({
      query: query ?? '',
      mode: mode ?? this.searchSubject.getValue().mode
    })
  }

  setMode(mode: SearchMode) {
    const prev = this.searchSubject.value;
    this.searchSubject.next({ ...prev, mode });
  }

  // --------- SEARCH EINGINE ---------
  private search(items: Ingredient[], query: string, options: Required<SearchOptions>): Ingredient[] {
    const q = this.normalize(query);
    if (!q || q.length < options.minQueryLength) return []; // return if query is null or smaller than 2 chars

    const results: Array<{ item: Ingredient; score: number }> = [];

    for (const item of items) {
      const nameAllowed = options.mode !== 'parts';
      const partsAllowed = options.mode !== 'name';

      const nameNorm = this.normalize(item.name);
      const nameScore = nameAllowed ? this.score(nameNorm, q) : 0;

      const parts = item.parts ?? [];
      let bestPartScore = 0;
      const matchingParts: IngredientPart[] = [];

      if (partsAllowed && parts.length) {
        for (const p of parts) {
          const pNorm = this.normalize(p.name);
          const s = this.score(pNorm, q);
          if (s > 0) {
            matchingParts.push(p);
            if (s > bestPartScore) bestPartScore = s;
          }
        }
      }

      if (nameScore === 0 && bestPartScore === 0) continue;

      const out: Ingredient = options.keepOnlyMatchingParts
        ? { ...item, parts: matchingParts }
        : item;

      const combinedScore = Math.max(nameScore, bestPartScore * 0.95);
      results.push({ item: out, score: combinedScore });
    }
    
    if (!options.sortByRelevance) return results.map(r => r.item);
    results.sort((a, b) => b.score - a.score);
    const limit = options.limit ?? 20;
    const sliced = limit > 0 ? results.slice(0, limit) : results;

    return sliced.map(r => r.item);
  }

  private score(text: string, q: string): number {
    if (!text) return 0;
    if (text === q) return 100;
    if (text.startsWith(q)) return 80;

    const words = text.split(/\s+/);
    if (words.some(w => w.startsWith(q))) return 60;

    if (text.includes(q)) return 40;
    return 0;
  }

  private normalize(s: string): string {
    return (s ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}