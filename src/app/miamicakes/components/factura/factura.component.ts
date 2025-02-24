import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../../service/contacto.service';
import { Router } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  datosContacto: any;

  constructor(
    private contactoService: ContactoService,
    public router: Router
  ) {}

  ngOnInit() {
    this.datosContacto = this.contactoService.getDatosContacto();
    if (!this.datosContacto) {
      this.router.navigate(['/contacto']);
    }
  }

  enviarCorreo() {
    const templateParams = {
      nombre: this.datosContacto.nombre,
      email: this.datosContacto.email,
      sabor: this.datosContacto.sabor,
      tamano: this.datosContacto.tamano,
      mensaje: this.datosContacto.mensaje
    };

    emailjs.send('service_spnyu67', 'template_g8hlpa9', templateParams, 'tYt8n0aD7MaXFXaXQ')
      .then(
        response => alert('Correo enviado correctamente'),
        error => alert('Error al enviar el correo')
      );
  }
}
