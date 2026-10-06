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

  constructor(private router: Router) { }

  onStartDemo(): void {
    this.router.navigate(['/demo']);
  }
}
