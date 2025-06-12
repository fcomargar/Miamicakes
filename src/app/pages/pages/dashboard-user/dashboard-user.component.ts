import { Component } from '@angular/core';
import { DashboardComponent } from "../../../miamicakes/components/dashboard/dashboard.component";
import { NavbarComponent } from "../../../miamicakes/components/navbar/navbar.component";
import { FooterComponent } from "../../../miamicakes/components/footer/footer.component";

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [DashboardComponent, NavbarComponent, FooterComponent],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css'
})
export class DashboardUserComponent {

}
