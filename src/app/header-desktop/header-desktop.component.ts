import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HEADER_BUTTONS } from '../enum and interfaces/HeaderButtons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class HeaderDesktopComponent {
  logo: string = '../../assets/logos/logo.png';
  buttons = HEADER_BUTTONS;

  constructor(
    private router: Router,
    // private localStorageService: LocalStorageService,
  ) {
    // this.loadActiveIndex(); // Load from storage when component initializes
  }

  // loadActiveIndex() { // TODO: check if needed here or move to localStorage service file
  //   const storedIndex = this.localStorageService.getItem(HeaderActiveIndex.key);
  //   if (storedIndex !== null) {
  //     this.localStorageService.activeIndex = parseInt(storedIndex, 10);
  //   }
  // }

  getActiveIndex(): number {
    // return this.localStorageService.activeIndex;
    return 1;
  }

  navButtonClicked(route: string, index: number): void {
    console.log('navButtonClicked clicked', route, index);
  }

  openInstagram(): void {
    console.log('openFacebook clicked');
  }

  openFacebook(): void {
    console.log('openFacebook clicked');
  }

  generateRecipe(): void {
    console.log('generateRecipe clicked');
    // route or action here
  }
}