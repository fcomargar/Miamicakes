import { Component } from '@angular/core';
import { NavbarComponent } from "../../../miamicakes/components/navbar/navbar.component";
import { LoginComponent } from "../../../miamicakes/components/login/login.component";
import { FooterComponent } from "../../../miamicakes/components/footer/footer.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NavbarComponent, LoginComponent, FooterComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
