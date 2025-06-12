import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private base = '/api/email';

  constructor(private http: HttpClient) {}

  /** Notificar cambio de estado de solicitud */
  enviarNotificacionSolicitud(solicitudId: number, estado: string): Observable<void> {
    return this.http.post<void>(`${this.base}/solicitud`, { solicitudId, estado });
  }

  /** Notificar cambio de estado de presupuesto */
  enviarNotificacionPresupuesto(presupuestoId: number, solicitudId: number, estado: string): Observable<void> {
    return this.http.post<void>(`${this.base}/presupuesto`, { presupuestoId, solicitudId, estado });
  }
}
