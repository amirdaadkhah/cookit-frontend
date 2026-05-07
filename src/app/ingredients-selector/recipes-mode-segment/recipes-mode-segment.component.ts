import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

export const SEGMENT = {
  MATCH_ALL: 'Match_All',
  MATCH_BEST: 'Best_Match',
} as const;

export type RecipeGenerateMode = typeof SEGMENT[keyof typeof SEGMENT];

@Component({
  selector: 'app-recipes-mode-segment',
  templateUrl: './recipes-mode-segment.component.html',
  styleUrls: ['./recipes-mode-segment.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],

})
export class RecipesModeSegmentComponent {
  readonly SEGMENT = SEGMENT;
  selectedSegment = SEGMENT.MATCH_ALL;
  @Output() segmentChange = new EventEmitter<RecipeGenerateMode>();

  constructor() { }

  onSegmentChange(event: CustomEvent) {
    const selected = event.detail.value as RecipeGenerateMode;
    this.segmentChange.emit(selected);
  }
}
