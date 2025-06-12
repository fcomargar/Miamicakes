// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

/**
 * Interfaz Usuario con todos los campos que devolvemos en el login:
 * - id: identificador
 * - nombre: nombre completo
 * - email: correo
 * - rol: 'USUARIO' | 'ADMINISTRADOR'
 */
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'USUARIO' | 'ADMINISTRADOR';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioLogueado: Usuario | null = null;

  /**
   * Guarda el usuario logueado en memoria y en localStorage
   * (ya incluye el rol)
   */
  setUsuario(usuario: Usuario): void {
    this.usuarioLogueado = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  /**
   * Recupera el usuario logueado desde memoria o localStorage
   */
  getUsuario(): Usuario | null {
    if (this.usuarioLogueado) {
      return this.usuarioLogueado;
    }

    const guardado = localStorage.getItem('usuario');
    if (guardado) {
      // Al parsear, tendremos también la propiedad 'rol'
      this.usuarioLogueado = JSON.parse(guardado) as Usuario;
      return this.usuarioLogueado;
    }

    return null;
  }

  /**
   * Comprueba si hay un usuario autenticado
   */
  estaLogueado(): boolean {
    return this.getUsuario() !== null;
  }

  /**
   * Cierra la sesión eliminando los datos del usuario
   */
  cerrarSesion(): void {
    this.usuarioLogueado = null;
    localStorage.removeItem('usuario');
  }
}
