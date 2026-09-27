import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

interface HowItWorksStep {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
})
export class HowItWorksComponent {
readonly steps: HowItWorksStep[] = [
    {
      icon: 'basket-outline',
      title: 'Add what you have',
      description: 'Choose your available ingredients'
    },
    {
      icon: 'search-outline',
      title: 'We find recipes',
      description: 'Our AI matches the best recipes'
    },
    {
      icon: 'heart-outline',
      title: 'Cook & enjoy',
      description: 'Discover new favorite meals'
    }
  ];
  constructor() { }


}
