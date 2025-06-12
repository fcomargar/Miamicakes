// dashboard-admin.component.ts

import { Component, OnInit }           from '@angular/core';
import { CommonModule }                from '@angular/common';
import { FormsModule }                 from '@angular/forms';
import { RouterModule, Router }        from '@angular/router';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AuthService, Usuario }        from '../../../service/auth.service';
import {
  SolicitudService,
  SolicitudPresupuestoDTO
} from '../../../service/solicitud.service';
import {
  PresupuestoService,
  Presupuesto
} from '../../../service/presupuesto.service';
import { EmailService } from '../../../service/email.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  // --- usuario y autorizaciones ---
  usuario!: Usuario;
  isAdmin = false;

  // --- datos de solicitudes/presupuestos ---
  solicitudes: SolicitudPresupuestoDTO[] = [];
  presupuestosMap: { [solId: number]: Presupuesto[] } = {};
  precioNuevo: { [solId: number]: number } = {};

  // --- control de sección activa en el menú ---
  seccionSeleccionada: 'solicitudes' | 'seguridad' = 'solicitudes';

  // --- campos para cambiar contraseña ---
  contrasenaActual     = '';
  nuevaContrasena      = '';
  confirmarContrasena  = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private solicitudService: SolicitudService,
    private presupuestoService: PresupuestoService,
    private http: HttpClient,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    const u = this.authService.getUsuario();
    if (!u) {
      this.router.navigate(['/login']);
      return;
    }
    this.usuario  = u;
    this.isAdmin  = u.rol === 'ADMINISTRADOR';
    if (!this.isAdmin) {
      // si no es admin, mostramos pantalla de notFound y no cargamos datos
      return;
    }

    this.cargarSolicitudes();
  }

  // --- alternar sección al hacer clic en el nav ---
  seleccionarSeccion(sec: 'solicitudes' | 'seguridad'): void {
    this.seccionSeleccionada = sec;
  }

  private cargarSolicitudes(): void {
    this.solicitudService.listarTodas()
      .subscribe({
        next: list => {
          this.solicitudes = list;
          list.forEach(s => {
            this.presupuestoService
              .listarPorSolicitud(s.id)
              .subscribe(ps => this.presupuestosMap[s.id] = ps);
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error cargando solicitudes:', err);
          alert('No se pudieron cargar las solicitudes.');
        }
      });
  }

  trackById(_: number, item: SolicitudPresupuestoDTO) {
    return item.id;
  }

    aceptar(s: SolicitudPresupuestoDTO) {
    this.solicitudService.cambiarEstado(s.id, 'ACEPTADA').subscribe({
      next: updated => {
        Object.assign(s, updated);
        this.emailService.enviarNotificacionSolicitud(s.id, updated.estado)
          .subscribe({ error: e => console.error('Email solicitud:', e) });
      },
      error: err => { console.error(err); alert('No se pudo aceptar.'); }
    });
  }

  rechazar(s: SolicitudPresupuestoDTO) {
    this.solicitudService.cambiarEstado(s.id, 'RECHAZADA').subscribe({
      next: updated => {
        Object.assign(s, updated);
        this.emailService.enviarNotificacionSolicitud(s.id, updated.estado)
          .subscribe({ error: e => console.error('Email solicitud:', e) });
      },
      error: err => { console.error(err); alert('No se pudo rechazar.'); }
    });
  }

  crearPresupuesto(s: SolicitudPresupuestoDTO) {
    const precio = this.precioNuevo[s.id];
    if (!precio || precio <= 0) { return alert('Introduce un precio válido'); }
    this.presupuestoService.crear(s.id, precio).subscribe({
      next: p => {
        const arr = this.presupuestosMap[s.id] || [];
        this.presupuestosMap[s.id] = [...arr, p];
        this.precioNuevo[s.id] = 0;
        // Notificar creación de presupuesto
        this.emailService.enviarNotificacionPresupuesto(p.id, s.id, p.estado)
          .subscribe({ error: e => console.error('Email presupuesto:', e) });
      },
      error: err => { console.error(err); alert('No se pudo crear presupuesto.'); }
    });
  }

  actualizarPrecio(p: Presupuesto) {
    this.presupuestoService.actualizarPrecio(p.id, p.precio).subscribe({
      next: updated => {
        p.precio = updated.precio;
        // Notificar actualización de precio
        this.emailService.enviarNotificacionPresupuesto(p.id, (p as any).solicitudId, updated.estado)
          .subscribe({ error: e => console.error('Email presupuesto:', e) });
      },
      error: err => { console.error(err); alert('No se pudo actualizar precio.'); }
    });
  }

  marcarEnviado(p: Presupuesto) {
    this.presupuestoService.cambiarEstado(p.id, 'ENVIADO').subscribe({
      next: updated => {
        p.estado = updated.estado;
        p.fechaEnvio = updated.fechaEnvio!;
        // Notificar envío de presupuesto
        this.emailService.enviarNotificacionPresupuesto(p.id, (p as any).solicitudId, updated.estado)
          .subscribe({ error: e => console.error('Email presupuesto:', e) });
      },
      error: err => { console.error(err); alert('No se pudo marcar enviado.'); }
    });
  }

  
  entregarPresupuesto(p: Presupuesto, solId: number) {
    this.presupuestoService
      .cambiarEstado(p.id, 'FINALIZADO')
      .subscribe({
        next: updated => {
          // Actualizamos el objeto local
          p.estado = updated.estado;
          // (Opcional) no toca fechaEnvio
          // Notificamos por email
          this.emailService
            .enviarNotificacionPresupuesto(updated.id, solId, updated.estado)
            .subscribe({ error: e => console.error('Email entrega:', e) });
        },
        error: err => {
          console.error('Error al entregar presupuesto:', err);
          alert('No se pudo marcar como entregado.');
        }
      });
  }

   descargarFactura(s: SolicitudPresupuestoDTO, p: Presupuesto) {
      const doc = new jsPDF();
  
      // Título
      doc.setFontSize(18);
      doc.text('Factura de Presupuesto', 14, 22);
  
      // Datos de la solicitud
      doc.setFontSize(12);
      doc.text(`ID Solicitud: ${s.id}`, 14, 40);
      doc.text(`Usuario: ${this.usuario.nombre} (${this.usuario.email})`, 14, 50);
      doc.text(`Teléfono: ${s.telefono}`, 14, 60);
      doc.text(`Dirección: ${s.direccion}`, 14, 70);
      doc.text(`Tamaño: ${s.tamano}`, 14, 80);
      doc.text(`Sabor: ${s.sabor}`, 14, 90);
      doc.text(`Tema: ${s.tema}`, 14, 100);
      if (s.mensaje) {
        doc.text(`Mensaje: ${s.mensaje}`, 14, 110);
      }
  
      // Espacio antes de presupuesto
      const yOffset = s.mensaje ? 120 : 110;
  
      // Datos del presupuesto
      doc.setFontSize(14);
      doc.text('--- Presupuesto ---', 14, yOffset);
      doc.setFontSize(12);
      doc.text(`Precio: ${p.precio.toFixed(2)} €`, 14, yOffset + 10);
      if (p.fechaEnvio) {
        doc.text(`Enviado: ${new Date(p.fechaEnvio).toLocaleString()}`, 14, yOffset + 20);
      }
      doc.text(`Estado: ${p.estado}`, 14, yOffset + 30);
  
      // Generar y forzar descarga
      doc.save(`factura_sol_${s.id}_presu_${p.id}.pdf`);
    }


  // --- cambio de contraseña con verificación ---
  cambiarContrasena(): void {
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      return alert('La nueva contraseña y la confirmación no coinciden.');
    }
    if (this.nuevaContrasena.length < 6) {
      return alert('La contraseña debe tener al menos 6 caracteres.');
    }

    // Construimos el payload incluyendo contraseña actual para validación en backend
    const payload = {
      id: this.usuario.id,
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      contrasenaActual: this.contrasenaActual,
      contrasena: this.nuevaContrasena,
      rol: this.usuario.rol
    };

    this.http.put<Usuario>(
      `http://localhost:8080/api/usuarios/${this.usuario.id}`,
      payload
    ).subscribe({
      next: updated => {
        // actualizamos localmente si es necesario
        this.contrasenaActual    = '';
        this.nuevaContrasena     = '';
        this.confirmarContrasena = '';
        alert('Contraseña actualizada con éxito.');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error cambiando contraseña:', err);
        if (err.status === 400) {
          alert('Contraseña actual incorrecta.');
        } else {
          alert('No se pudo actualizar la contraseña.');
        }
      }
    });
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
