import { Component } from '@angular/core';
import { NavbarComponent } from "../../../miamicakes/components/navbar/navbar.component";
import { LoginComponent } from "../../../miamicakes/components/login/login.component";
import { FooterComponent } from "../../../miamicakes/components/footer/footer.component";
import { RegistroComponent } from "../../../miamicakes/components/registro/registro.component";

@Component({
  selector: 'app-registro-page',
  standalone: true,
  imports: [NavbarComponent, LoginComponent, FooterComponent, RegistroComponent],
  templateUrl: './registro-page.component.html',
  styleUrl: './registro-page.component.css'
})
export class RegistroPageComponent {

}
