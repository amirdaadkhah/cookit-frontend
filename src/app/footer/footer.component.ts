import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class FooterComponent {
  logo: string = '../../assets/logos/logo.png';

  constructor() {}
}
