import { environment } from '@/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';

export interface RecipeTagDto {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TagsSearchService {
  private apiURL = environment.apiURL;
  private tagSubject = new BehaviorSubject<string[]>([]);
  tags$ = this.tagSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadTags(): void { // using resolver - preload before route loads
    this.http.get<RecipeTagDto[]>(`${this.apiURL}/tags`).pipe(
      map(tags => tags.map(t => t.name)),
      map(tags => this.uniqueTags(tags)),
      catchError(() => of([]))
    ).subscribe(tags => this.tagSubject.next(tags));
  }

  searchTags(query: string): Observable<string[]> {
    const normalizedQuery = this.normalizeTag(query);
    return this.tags$.pipe(
      map(tags => {
        if (!normalizedQuery) return []; // empty input → return empty array
        return tags.filter(tag => // if matches exist → return them // filter matching tags
          tag.toLowerCase().includes(normalizedQuery)
        );
      })
    );
  }

  addNewTagsToDB(currentInputedTags: string[]): Observable<void> {
    const normalized = currentInputedTags.map(t => this.normalizeTag(t));
    return this.tags$.pipe(
      take(1),
      switchMap(existing => {
        const existingNormalized = existing.map(t => this.normalizeTag(t));
        const newTags = normalized.filter(t => !existingNormalized.includes(t));
        if (newTags.length === 0) return of(void 0);

        return this.http.post(`${this.apiURL}/tags/add`, { newTags }).pipe(
          tap({
            next: () => {
              console.log('Tags added');
              this.tagSubject.next([...existing, ...newTags]);
            },
            error: err => {
              console.log('failed to add tags - error in server', err);
            }
          }),
          map(() => void 0)
        );
      })
    );
  }

  normalizeTag(tag: string): string {
    return tag.trim().toLowerCase().replace(/\s+/g, '_');
  }

  private uniqueTags(tags: string[]): string[] {
    return [...new Set(tags.map(t => this.normalizeTag(t)))];
  }
}