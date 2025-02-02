import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./miamicakes/components/navbar/navbar.component";
import { MiamicakesModule } from './miamicakes/miamicakes.module'; // Importa el módulo

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MiamicakesModule], // Importa el módulo aquí
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Miamicackes';
}