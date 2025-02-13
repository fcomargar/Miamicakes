import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../../service/contacto.service';
import { Router } from '@angular/router';

/**
 * @component
 * @description Componente para mostrar el resumen de la factura del pedido de tarta personalizada.
 * Obtiene los datos del contacto desde el servicio y los muestra en una tabla.
 */
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  /**
   * @property {any} datosContacto - Contiene la información del pedido realizada por el usuario.
   */
  datosContacto: any;

  /**
   * @constructor
   * @param {ContactoService} contactoService - Servicio para recuperar los datos del pedido.
   * @param {Router} router - Servicio de enrutamiento para la navegación.
   */
  constructor(
    private contactoService: ContactoService,
    public router: Router
  ) {}

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Recupera los datos del pedido desde el servicio. Si no hay datos, redirige al formulario de contacto.
   */
  ngOnInit() {
    this.datosContacto = this.contactoService.getDatosContacto();
    
    // Si no hay datos, redirigir al formulario de contacto
    if (!this.datosContacto) {
      this.router.navigate(['/contacto']);
    }
  }
}
