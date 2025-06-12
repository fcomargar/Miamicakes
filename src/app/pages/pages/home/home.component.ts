import { Component } from '@angular/core';
import { NavbarComponent } from "../../../miamicakes/components/navbar/navbar.component";
import { CustomCakesComponent } from "../../../miamicakes/components/custom-cakes/custom-cakes.component";
import { FooterComponent } from "../../../miamicakes/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { RegistroComponent } from "../../../miamicakes/components/registro/registro.component";
import { LoginComponent } from "../../../miamicakes/components/login/login.component";
import { DashboardComponent } from "../../../miamicakes/components/dashboard/dashboard.component";
import { DashboardAdminComponent } from "../../../miamicakes/components/dashboard-admin/dashboard-admin.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CustomCakesComponent, FooterComponent, RouterOutlet, RegistroComponent, LoginComponent, DashboardComponent, DashboardAdminComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
