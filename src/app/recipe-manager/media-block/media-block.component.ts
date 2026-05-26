import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-media-block',
  templateUrl: './media-block.component.html',
  styleUrls: ['./media-block.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class MediaBlockComponent {
  @Input({ required: true }) mediaGroup!: FormGroup;

  readonly mediaFields = [
    {
      label: 'Instagram URL',
      control: 'instagram',
      placeholder: 'https://www.instagram.com/...'
    },
    {
      label: 'Tiktok URL',
      control: 'tiktok',
      placeholder: 'https://www.tiktok.com/...'
    },
    {
      label: 'YouTube URL',
      control: 'youtube',
      placeholder: 'https://www.youtube.com/...'
    },
    {
      label: 'Web URL',
      control: 'webpage',
      placeholder: 'https://www.example.com/...'
    }
  ];

  constructor() { }
}
