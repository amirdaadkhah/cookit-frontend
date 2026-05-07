import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { PresentHeaderComponent } from '../home components/present-header/present-header.component';
import { AboutAlgorithmComponent } from '../home components/about-algorithm/about-algorithm.component';
import { FooterComponent } from '../footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PresentHeaderComponent,
    AboutAlgorithmComponent,
    FooterComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
