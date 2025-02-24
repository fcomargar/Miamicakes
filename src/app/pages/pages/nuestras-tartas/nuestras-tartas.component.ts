import { Component } from '@angular/core';
import { NavbarComponent } from "../../../miamicakes/components/navbar/navbar.component";
import { BannerCustomCakeComponent } from "../../../miamicakes/components/banner-custom-cake/banner-custom-cake.component";
import { MiamicakesModule } from "../../../miamicakes/miamicakes.module";
import { FooterComponent } from "../../../miamicakes/components/footer/footer.component";



@Component({
  selector: 'app-nuestras-tartas',
  standalone: true,
  imports: [NavbarComponent, BannerCustomCakeComponent, MiamicakesModule, FooterComponent],
  templateUrl: './nuestras-tartas.component.html',
  styleUrl: './nuestras-tartas.component.css'
})
export class NuestrasTartasComponent {

}
