import { Component } from '@angular/core';
import { IngredientsSelectorComponent } from '../ingredients-selector/ing-selector.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../footer/footer.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    IngredientsSelectorComponent,
    FooterComponent,
    HowItWorksComponent
  ]
})
export class DemoComponent {
  header: string = '../../assets/images/generate-recipe-header01.png';

  constructor() { }
}
