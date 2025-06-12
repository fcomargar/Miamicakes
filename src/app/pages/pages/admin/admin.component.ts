import { Component } from '@angular/core';
import { NavbarComponent } from "../../../miamicakes/components/navbar/navbar.component";
import { DashboardAdminComponent } from "../../../miamicakes/components/dashboard-admin/dashboard-admin.component";
import { FooterComponent } from "../../../miamicakes/components/footer/footer.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavbarComponent, DashboardAdminComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
