import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class CardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';


  constructor() { }


}
