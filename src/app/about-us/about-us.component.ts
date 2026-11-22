import { Component } from '@angular/core';
import { AboutUsHeaderComponent } from './about-us-header/about-us-header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../footer/footer.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    AboutUsHeaderComponent,
    FooterComponent,
    HowItWorksComponent
  ]
})
export class AboutUsComponent {

  constructor() { }
}
