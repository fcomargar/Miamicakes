import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService, Usuario } from '../../../service/auth.service';
import {
  SolicitudService,
  CrearSolicitudDTO,
  SolicitudPresupuestoDTO
} from '../../../service/solicitud.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  // Datos del usuario en sesión
  usuario: Usuario | null = null;

  // Campos del formulario
  sabor = '';
  tamano = '';
  tema = '';
  mensaje = '';
  telefono = '';
  direccion = '';

  constructor(
    private auth: AuthService,
    private solicitudService: SolicitudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.auth.getUsuario();
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }

  // Getter para la imagen según tamaño
  get rutaImagenPiso(): string | null {
    switch (this.tamano) {
      case '1 piso (8 porciones) 40€':  return 'assets/1piso.png';
      case '2 pisos (14 porciones) 70€': return 'assets/2piso.png';
      case '3 pisos (18 porciones) 100€': return 'assets/3piso.png';
      case '4 pisos (22 porciones) 120€': return 'assets/4piso.png';
      default: return null;
    }
  }

  enviarFormulario(form: NgForm): void {
    if (form.invalid) {
      alert('Por favor completa todos los campos obligatorios con datos válidos.');
      return;
    }

    const dto: CrearSolicitudDTO = {
      usuarioId: this.usuario!.id,
      tamano: this.tamano,
      sabor: this.sabor,
      tema: this.tema,
      mensaje: this.mensaje.trim() || undefined,
      telefono: this.telefono,
      direccion: this.direccion
    };

    this.solicitudService.crear(dto)
      .subscribe({
        next: (resp: SolicitudPresupuestoDTO) => {
          alert('¡Tu solicitud de tarta ha sido enviada correctamente!');
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.error('Error al enviar la solicitud:', err);
          alert('Hubo un problema al enviar la solicitud. Intenta nuevamente.');
        }
      });
  }
}
