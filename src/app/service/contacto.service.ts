import { Injectable } from '@angular/core';

/**
 * @@Injectable
 * @description Servicio para gestionar los datos de contacto del usuario en la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  /**
   * @private
   * @property {any} datosContacto - Almacena los datos del formulario de contacto.
   */
  private datosContacto: any;

  /**
   * @method setDatosContacto
   * @description Guarda los datos del formulario de contacto.
   * @param {any} datos - Datos ingresados por el usuario en el formulario de contacto.
   */
  setDatosContacto(datos: any): void {
    this.datosContacto = datos;
  }

  /**
   * @method getDatosContacto
   * @description Retorna los datos almacenados del formulario de contacto.
   * @returns {any} Los datos de contacto guardados.
   */
  getDatosContacto(): any {
    return this.datosContacto;
  }
}
