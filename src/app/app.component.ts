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
import { CommonModule } from '@angular/common'; 
import { ContactoComponent } from "./miamicakes/components/contacto/contacto.component";
import { MealsComponent } from "./miamicakes/components/meals/meals.component";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, NavbarComponent, MiamicakesModule,ReactiveFormsModule, HttpClientModule, CustomCakesComponent, FooterComponent, BannerCustomCakeComponent, NosotrosComponentc, NosotrosComponent, ContactoComponent, MealsComponent], // Importa el módulo aquí
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Miamicackes';
}