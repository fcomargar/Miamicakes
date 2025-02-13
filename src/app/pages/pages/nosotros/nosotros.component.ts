import { Component } from '@angular/core';
import { NavbarComponent } from "../../../miamicakes/components/navbar/navbar.component";
import { NosotrosComponentc } from '../../../miamicakes/components/nosotros/nosotros.component';
import { FooterComponent } from '../../../miamicakes/components/footer/footer.component';
import{RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-nosotrosS',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,NosotrosComponentc,FooterComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

}
