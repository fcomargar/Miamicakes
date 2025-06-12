import { Component, OnInit }           from '@angular/core';
import { CommonModule }                from '@angular/common';
import { RouterModule, Router }        from '@angular/router';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule }                 from '@angular/forms';

import { AuthService, Usuario }        from '../../../service/auth.service';
import {
  SolicitudService,
  SolicitudPresupuestoDTO
} from '../../../service/solicitud.service';
import {
  PresupuestoService,
  Presupuesto
} from '../../../service/presupuesto.service';
import { jsPDF } from 'jspdf';
import { EmailService } from '../../../service/email.service';

interface Pedido {
  id: number;
  fecha: string;
  estado: string;
}

interface UsuarioCompleto {
  id: number;
  nombre: string;
  email: string;
  contrasena: string;
  rol: 'USUARIO' | 'ADMINISTRADOR';
  solicitudes: SolicitudPresupuestoDTO[];
  pedidos: Pedido[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuario!: Usuario;
  usuarioCompleto!: UsuarioCompleto;
  solicitudes: SolicitudPresupuestoDTO[] = [];
  pedidos: Pedido[] = [];
  presupuestosMap: { [solId: number]: Presupuesto[] } = {};

  seccionSeleccionada: 'dashboard' | 'info' | 'security' | 'delete' = 'dashboard';

  // Campos de formulario
  infoNombre = '';
  infoEmail  = '';
  contrasenaActual   = '';
  nuevaContrasena    = '';
  confirmarContrasena = '';

  // Pago con tarjeta
  mostrarModalPago   = false;
  modalSolicitudId!: number;
  modalPresupuesto!: Presupuesto;
  numeroTarjeta     = '';
  nombreTitular     = '';
  expiracionTarjeta = '';
  ccvTarjeta        = '';
  cargandoPago      = false;
  pagoExitoso       = false;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private solicitudService: SolicitudService,
    private presupuestoService: PresupuestoService,
    public router: Router,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    const u = this.auth.getUsuario();
    if (!u) {
      this.router.navigate(['/login']);
      return;
    }
    this.usuario = u;
    this.recargarUsuarioCompleto();
    this.cargarSolicitudes();
    this.recargarPedidos();
    
    
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

  private recargarUsuarioCompleto(): void {
    this.http.get<UsuarioCompleto>(`http://localhost:8080/api/usuarios/${this.usuario.id}`)
      .subscribe({
        next: uc => {
          this.usuarioCompleto = uc;
          this.infoNombre = uc.nombre;
          this.infoEmail  = uc.email;
          this.solicitudes = uc.solicitudes || [];
          this.pedidos     = uc.pedidos    || [];
          this.solicitudes.forEach(s =>
            this.presupuestoService
              .listarPorSolicitud(s.id)
              .subscribe(ps => this.presupuestosMap[s.id] = ps)
          );
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error cargando usuario completo:', err);
          this.auth.cerrarSesion();
          this.router.navigate(['/login']);
        }
      });
  }

   private cargarSolicitudes(): void {
    this.solicitudService.listarTodas()
      .subscribe({
        next: (list: SolicitudPresupuestoDTO[]) => {
          this.solicitudes = list.filter(s => s.usuarioId === this.usuario.id);
          this.solicitudes.forEach(s => {
            this.presupuestoService.listarPorSolicitud(s.id)
              .subscribe({
                next: (ps: Presupuesto[]) => this.presupuestosMap[s.id] = ps,
                error: err => console.error(`Error presupuestos ${s.id}:`, err)
              });
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error cargando solicitudes:', err);
          alert('No se pudieron cargar tus solicitudes.');
        }
      });
  }

  private recargarPedidos(): void {
    this.http.get<Pedido[]>(`http://localhost:8080/api/usuarios/${this.usuario.id}/pedidos`)
      .subscribe({
        next: (peds: Pedido[]) => this.pedidos = peds,
        error: (err: HttpErrorResponse) => {
          console.error('Error cargando pedidos:', err);
        }
      });
  }

  seleccionarSeccion(sec: 'dashboard'|'info'|'security'|'delete'): void {
    this.seccionSeleccionada = sec;
  }

  // --- Actualizar nombre y email ---
  actualizarInfoUsuario(): void {
    this.usuarioCompleto.nombre = this.infoNombre;
    this.usuarioCompleto.email  = this.infoEmail;
    this.http.put<UsuarioCompleto>(
      `http://localhost:8080/api/usuarios/${this.usuario.id}`,
      this.usuarioCompleto
    ).subscribe({
      next: updated => {
        this.auth.setUsuario({
          id: updated.id,
          nombre: updated.nombre,
          email: updated.email,
          rol: updated.rol
        });
        this.usuario = this.auth.getUsuario()!;
        this.usuarioCompleto = updated;
        alert('Información actualizada con éxito.');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error actualizando información:', err);
        alert('No se pudo actualizar tu información.');
      }
    });
  }

   // --- Cambiar contraseña (con verificación de actual) ---
  cambiarContrasena(): void {
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      return alert('La nueva contraseña y la confirmación no coinciden.');
    }
    if (this.nuevaContrasena.length < 6) {
      return alert('La contraseña debe tener al menos 6 caracteres.');
    }
    // payload completo con current y new password en mismo campo "contrasena"
    const payload = {
      id: this.usuarioCompleto.id,
      nombre: this.usuarioCompleto.nombre,
      email: this.usuarioCompleto.email,
      contrasenaActual: this.contrasenaActual,   // servidor validará
      contrasena: this.nuevaContrasena,
      solicitudes: this.usuarioCompleto.solicitudes,
      pedidos: this.usuarioCompleto.pedidos,
      rol: this.usuarioCompleto.rol
    };
    this.http.put<UsuarioCompleto>(
      `http://localhost:8080/api/usuarios/${this.usuario.id}`,
      payload
    ).subscribe({
      next: updated => {
        this.usuarioCompleto = updated;
        this.contrasenaActual = '';
        this.nuevaContrasena = '';
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

  // --- Pago con tarjeta ---
  abrirModalPago(p: Presupuesto, solId: number): void {
    this.modalPresupuesto = p;
    this.modalSolicitudId = solId;
    this.numeroTarjeta = '';
    this.nombreTitular = '';
    this.expiracionTarjeta = '';
    this.ccvTarjeta = '';
    this.cargandoPago = false;
    this.pagoExitoso = false;
    this.mostrarModalPago = true;
  }

  cerrarModalPago(): void {
    this.mostrarModalPago = false;
  }

  enviarFormularioPago(): void {
    const onlyDigits = (s: string) => s.replace(/\D/g, '');
    if (onlyDigits(this.numeroTarjeta).length !== 16) {
      return alert('El número de tarjeta debe tener 16 dígitos.');
    }
    if (!this.nombreTitular.trim()) {
      return alert('El nombre del titular es obligatorio.');
    }
    if (!/^\d{2}\/\d{2}$/.test(this.expiracionTarjeta)) {
      return alert('Caducidad inválida. Formato MM/AA.');
    }
    const [mm, aa] = this.expiracionTarjeta.split('/').map(n => +n);
    const ultimoDia = new Date(2000 + aa, mm, 0);
    if (ultimoDia < new Date()) {
      return alert('La tarjeta está vencida.');
    }
    if (this.ccvTarjeta.length !== 3 || isNaN(+this.ccvTarjeta)) {
      return alert('El CCV debe tener 3 dígitos.');
    }

    this.cargandoPago = true;
    setTimeout(() => {
      this.cargandoPago = false;
      this.pagoExitoso = true;
      setTimeout(() => {
        this.mostrarModalPago = false;
        this.pagarAhora(this.modalPresupuesto, this.modalSolicitudId);
      }, 2000);
    }, 3000);
  }

  pagarAhora(p: Presupuesto, solId: number): void {
    this.presupuestoService
      .cambiarEstado(p.id, 'PAGADO')
      .subscribe({
        next: updated => {
          const arr = this.presupuestosMap[solId] || [];
          this.presupuestosMap[solId] = arr.map(x => x.id === updated.id ? updated : x);
          this.recargarUsuarioCompleto();
          this.recargarPedidos();
          this.cargarSolicitudes();
          // Enviar correo de presupuesto PAGADO
          this.emailService
          .enviarNotificacionPresupuesto(updated.id, solId, updated.estado)
          .subscribe({ error: e => console.error('Email presupuesto:', e) });
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error procesando pago:', err);
          alert('No se pudo procesar el pago.');
        }
      });
  }

    /**
   * Marca la solicitud completa como RECHAZADA
   */
  rechazarSolicitud(solicitudId: number): void {
    this.solicitudService
      .cambiarEstado(solicitudId, 'RECHAZADA')
      .subscribe({
        next: () => {
          // vuelves a recargar la lista de solicitudes para refrescar la UI
          this.recargarUsuarioCompleto();
          this.cargarSolicitudes();
          this.recargarPedidos();
          // Enviar correo usuario+admin
          this.emailService
          .enviarNotificacionSolicitud(solicitudId, 'RECHAZADA')
          .subscribe({ error: e => console.error('Email solicitud:', e) });
          
        },
        error: err => {
          console.error('Error al rechazar solicitud:', err);
          alert('No se pudo rechazar la solicitud.');
        }
      });
  }

  /**
   * Marca un presupuesto como RECHAZADO.
   */
  rechazarPresupuesto(p: Presupuesto, solId: number): void {
    this.presupuestoService
      .cambiarEstado(p.id, 'RECHAZADO')
      .subscribe({
        next: updated => {
          // Reemplazar en el array local para refrescar la UI
          const arr = this.presupuestosMap[solId] || [];
          this.presupuestosMap[solId] = arr.map(x =>
            x.id === updated.id ? updated : x
          );
          this.recargarUsuarioCompleto();
          this.cargarSolicitudes();
          this.recargarPedidos();
          // Enviar correo de presupuesto
          this.emailService
          .enviarNotificacionPresupuesto(updated.id, solId, updated.estado)
          .subscribe({ error: e => console.error('Email presupuesto:', e) });
        },
        error: err => {
          console.error('Error rechazando presupuesto:', err);
          alert('No se pudo rechazar el presupuesto.');
        }
      });
  }



  nuevaSolicitud(): void {
    this.router.navigate(['/contacto']);
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }

  borrarCuenta(): void {
    if (!confirm('¿Seguro que quieres borrar tu cuenta?')) return;
    this.http.delete<void>(`http://localhost:8080/api/usuarios/${this.usuario.id}`)
      .subscribe({
        next: () => {
          alert('Cuenta eliminada.');
          this.cerrarSesion();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error borrando cuenta:', err);
          alert('No se pudo eliminar la cuenta.');
        }
      });
  }
}
