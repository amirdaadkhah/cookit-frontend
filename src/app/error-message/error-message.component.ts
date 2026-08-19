import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class ErrorMessageComponent {
  @Input() title = 'Something went wrong';
  @Input() message = 'Please try again.';

  @Output() close = new EventEmitter<void>();

  closeError() {
    this.close.emit();
  }

  constructor() { }
}
