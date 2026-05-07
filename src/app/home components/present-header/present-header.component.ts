import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-present-header',
  templateUrl: './present-header.component.html',
  styleUrls: ['./present-header.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PresentHeaderComponent {
  header_foto01: string = '../../assets/images/home_header01.PNG';
  header_foto02: string = '../../assets/images/home_header02.PNG';
  logo: string = '../../assets/logos/logo.png';

  constructor() { }
}
