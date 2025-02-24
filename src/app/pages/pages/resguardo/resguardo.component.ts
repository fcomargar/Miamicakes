import { Component } from '@angular/core';
import { NavbarComponent } from "../../../miamicakes/components/navbar/navbar.component";
import { FacturaComponent } from "../../../miamicakes/components/factura/factura.component";
import { FooterComponent } from "../../../miamicakes/components/footer/footer.component";

@Component({
  selector: 'app-resguardo',
  standalone: true,
  imports: [NavbarComponent, FacturaComponent, FooterComponent],
  templateUrl: './resguardo.component.html',
  styleUrl: './resguardo.component.css'
})
export class ResguardoComponent {

}
