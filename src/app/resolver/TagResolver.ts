import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { TagsSearchService } from "../services/tags-search.service";

@Injectable({ providedIn: 'root' })
export class TagsResolver implements Resolve<void> { // preload before route loads
  constructor(private tagsService: TagsSearchService) {}

  resolve(): void {
    this.tagsService.loadTags();
  }
}