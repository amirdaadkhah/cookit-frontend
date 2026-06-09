import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class HeaderMobileComponent {
  logo: string = '../../assets/logos/logo.png';

  constructor(
    private router: Router,
  ) { }

  openMenu(): void { }

  homeClicked(): void {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}