import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      icon: 'leaf',
      title: 'Add what you have',
      description: 'Choose ingredients from your fridge, pantry or type them in.'
    },
    {
      icon: 'search',
      title: 'Get recipe ideas',
      description: 'Mixia suggests creative. delicious recipes in seconds.'
    },
    {
      icon: 'receipt',
      title: 'Cook & enjoy',
      description: 'Follow simple steps and make something amazing.'
    }
  ];
  constructor(private router: Router) { }

  startDemo() {
    this.router.navigate(['/demo']);
  }
}
