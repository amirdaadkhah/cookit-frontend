import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fantasy-spinner',
  templateUrl: './fantasy-spinner.component.html',
  styleUrls: ['./fantasy-spinner.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class FantasySpinnerComponent {
  @Input() text = 'Creating your recipes...';

  constructor() { }

}
