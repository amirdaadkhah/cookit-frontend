import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
  mediaFbArray = this.fb.group({
    media: this.fb.group({
      instagram: [''],
      tiktok: [''],
      youtube: [''],
      webpage: [''],
    }),  
  });

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

  constructor(private readonly fb: FormBuilder) {}
}
