import { Component } from '@angular/core';
import { NavbarComponent } from "../../../miamicakes/components/navbar/navbar.component";
import { MealsComponent } from '../../../miamicakes/components/meals/meals.component';
import { FooterComponent } from "../../../miamicakes/components/footer/footer.component";

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [NavbarComponent,MealsComponent,FooterComponent],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent {

}
