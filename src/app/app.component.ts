import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./miamicakes/components/navbar/navbar.component";
import { MiamicakesModule } from './miamicakes/miamicakes.module';
import { CustomCakesComponent } from "./miamicakes/components/custom-cakes/custom-cakes.component"; 
import { BannerCustomCakeComponent } from "./miamicakes/components/banner-custom-cake/banner-custom-cake.component";
import { FooterComponent} from './miamicakes/components/footer/footer.component';
import { NosotrosComponentc } from "./miamicakes/components/nosotros/nosotros.component";
import { NosotrosComponent } from "./pages/pages/nosotros/nosotros.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ Importar CommonModule
import { ContactoComponent } from "./miamicakes/components/contacto/contacto.component"; // 👈 IMPORTANTE




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule ,FormsModule, NavbarComponent, MiamicakesModule, CustomCakesComponent, FooterComponent, BannerCustomCakeComponent, NosotrosComponentc, NosotrosComponent, ContactoComponent], // Importa el módulo aquí
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Miamicackes';
}