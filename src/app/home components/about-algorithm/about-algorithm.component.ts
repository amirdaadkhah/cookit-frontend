import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from './card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-algorithm',
  templateUrl: './about-algorithm.component.html',
  styleUrls: ['./about-algorithm.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CardComponent
  ]
})
export class AboutAlgorithmComponent {
  icon: string = 'accessibility-outline';
  title: string = 'Grocery specific features';
  description: string = 'Our platform includes all the features grocery stores need out-of-the box, like weighed products, and cutting options.';

  constructor(private router: Router) { }

  onStartDemo(): void {
    this.router.navigate(['/demo']);
  }
}
