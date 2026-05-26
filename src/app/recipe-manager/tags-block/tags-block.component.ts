import { TagsSearchService } from '@/app/services/tags-search.service';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-tags-block',
  templateUrl: './tags-block.component.html',
  styleUrls: ['./tags-block.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ]
})
export class TagsBlockComponent {
  @Input({ required: true }) tagsArray!: FormArray;
  private destroyRef = inject(DestroyRef);
  readonly tagSearch = new FormControl('', { nonNullable: true });
  readonly tagSuggestions = signal<string[]>([]);

  constructor(private tagsSearchService: TagsSearchService) {
    this.setupTagSearch();
  }

  private setupTagSearch(): void {
    this.tagSearch.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          const query = value.trim();
          return this.tagsSearchService.searchTags(query);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(tags => {
        const selected = this.tagsArray.value as string[];
        this.tagSuggestions.set(
          tags.filter(tag => !selected.includes(tag))
        );
      });
  }

  addTagFromInput(): void {
    const currentTags = this.tagsArray.value as string[];
    this.tagsSearchService.addNewTagsToDB(currentTags);
    this.tagSearch.setValue('');
  }

  addSuggestedTag(tag: string): void {
    const currentTags = this.tagsArray.value as string[];
    if (!currentTags.includes(tag)) {
      this.tagsArray.push(new FormControl(tag));
    }
    this.tagSearch.setValue('');
    this.tagSuggestions.set([]);
  }

  removeTag(index: number): void {
    this.tagsArray.removeAt(index);
  }

  trackByIndex(index: number): number {
    return index;
  }
}