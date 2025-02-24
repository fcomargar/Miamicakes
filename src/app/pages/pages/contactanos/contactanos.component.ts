import { Component } from '@angular/core';
import { NavbarComponent } from "../../../miamicakes/components/navbar/navbar.component";
import { ContactoComponent } from '../../../miamicakes/components/contacto/contacto.component'; 
import { FooterComponent } from '../../../miamicakes/components/footer/footer.component';
import{RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [NavbarComponent, ContactoComponent, FooterComponent, RouterOutlet],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent {

}
