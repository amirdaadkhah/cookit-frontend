import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us-header',
  templateUrl: './about-us-header.component.html',
  styleUrls: ['./about-us-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class AboutUsHeaderComponent {

  constructor(private router: Router) { }

  startDemo() {
    this.router.navigate(['/demo']);
  }
}
