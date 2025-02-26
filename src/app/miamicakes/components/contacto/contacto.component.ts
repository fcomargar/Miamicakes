import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContactoService } from '../../../service/contacto.service';
import emailjs from '@emailjs/browser';

/**
 * @component
 * @description Componente de contacto para solicitar tartas personalizadas.
 * Contiene un formulario para ingresar datos como email, nombre, sabor, tamaño y mensaje.
 */
@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  /**
   * @property {Object} contacto - Datos del formulario de contacto.
   * @property {string} contacto.email - Correo electrónico del usuario.
   * @property {string} contacto.nombre - Nombre del usuario.
   * @property {string} contacto.sabor - Sabor elegido para la tarta.
   * @property {string} contacto.tamano - Tamaño de la tarta.
   * @property {string} contacto.mensaje - Mensaje o descripción de la tarta personalizada.
   */
  contacto = {
    email: '',
    nombre: '',
    sabor: '',
    tamano: '',
    mensaje: ''
  };

  /**
   * @constructor
   * @param {Router} router - Servicio de navegación de Angular.
   * @param {ContactoService} contactoService - Servicio para almacenar los datos del contacto.
   */
  constructor(
    private router: Router,
    public contactoService: ContactoService
  ) {}

  /**
   * @method enviarFormulario
   * @description Envía el formulario si es válido. Guarda los datos en el servicio y redirige a la página de factura.
   * @param {any} form - Objeto del formulario Angular (ngForm).
   */
  enviarFormulario(form: any) {
    if (form.valid) {
      this.contactoService.setDatosContacto(this.contacto);
      this.router.navigate(['/factura']);
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  enviarCorreo() {
    const templateParams = {
      nombre: this.contacto.nombre,
      email: this.contacto.email,
      sabor: this.contacto.sabor,
      tamano: this.contacto.tamano,
      mensaje: this.contacto.mensaje
    };

    emailjs.send('service_spnyu67', 'template_g8hlpa9', templateParams, 'tYt8n0aD7MaXFXaXQ')
      .then(
        response => alert('Correo enviado correctamente'),
        error => alert('Error al enviar el correo')
      );
  }
}
