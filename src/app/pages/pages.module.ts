import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../miamicakes/components/navbar/navbar.component';
import { MiamicakesModule } from '../miamicakes/miamicakes.module';
import { CustomCakesComponent } from '../miamicakes/components/custom-cakes/custom-cakes.component'; 
import { BannerCustomCakeComponent } from '../miamicakes/components/banner-custom-cake/banner-custom-cake.component';
import { FooterComponent } from '../miamicakes/components/footer/footer.component';
import { NosotrosComponentc } from '../miamicakes/components/nosotros/nosotros.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterOutlet, NavbarComponent, MiamicakesModule, CustomCakesComponent,FooterComponent,BannerCustomCakeComponent,RouterOutlet,NosotrosComponentc
  ]
})
export class PagesModule { }
