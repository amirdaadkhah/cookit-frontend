import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

export interface RecipeTagDto {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TagsSearchService {
  // private readonly apiURL = 'http://localhost:5432';
  private apiURL = 'http://192.168.0.15:5432';

  private allTags: string[] = [];

  constructor(
    private http: HttpClient
  ) 
  {
    this.getSavedTags();
  }

  private getSavedTags(): void {
    this.http.get<RecipeTagDto[]>(`${this.apiURL}/tags`).pipe(
      map(tags => tags.map(tag => tag.name)),
      map(tags => this.uniqueTags(tags)),
      catchError(() => of([]))
    ).subscribe(tags => {
      this.allTags = tags;
    });
  }

  searchTags(query: string): string[] {
    const normalizedQuery = this.normalizeTag(query);
    if (!normalizedQuery) return []; // empty input → return empty array
    
    // filter matching tags
    const matches = this.allTags.filter(tag =>
      tag.toLowerCase().includes(normalizedQuery)
    );

    // if matches exist → return them
    // if no match → return user input as suggestion
    return matches.length > 0 ? matches : [normalizedQuery];
  }

  normalizeTag(tag: string): string {
    return tag.trim().toLowerCase().replace(/\s+/g, '_');
  }

  addNewTagsToDB(currentInputedTags: string[]) {
    const normalizedSaved = this.allTags.map(t => this.normalizeTag(t));
    const normalizedUpdated = currentInputedTags.map(t => this.normalizeTag(t));
    const newTags = normalizedUpdated.filter(tag => !normalizedSaved.includes(tag));
    if (newTags.length > 0) {
      this.addTagsToServer(newTags).subscribe({
        next: () => {
          console.log('Tags added');
          // updating latest loaded saved tags at start
          for(const tag of newTags) {
            this.allTags.push(tag);
          }
        },
        error: err => console.error(err)
      });
    }
  }

  private addTagsToServer(tags: string[]): Observable<any> {
    console.log('is sent to server: ', tags)
    return this.http.post(`${this.apiURL}/tags/add`, { tags });
  }

  uniqueTags(tags: string[]): string[] {
    return [...new Set(tags.map(tag => this.normalizeTag(tag)))];
  }
}