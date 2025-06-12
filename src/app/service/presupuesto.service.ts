// src/app/service/presupuesto.service.ts
import { Injectable }    from '@angular/core';
import { HttpClient,
         HttpParams }    from '@angular/common/http';
import { Observable }    from 'rxjs';

export interface Presupuesto {
  id: number;
  precio: number;
  estado: string;
  fechaEnvio?: string;
}

@Injectable({ providedIn: 'root' })
export class PresupuestoService {
  private baseUrl = 'http://localhost:8080/api/presupuestos';

  constructor(private http: HttpClient) {}

  listarPorSolicitud(solicitudId: number): Observable<Presupuesto[]> {
    return this.http.get<Presupuesto[]>(
      `${this.baseUrl}/solicitud/${solicitudId}`
    );
  }

  crear(solicitudId: number, precio: number): Observable<Presupuesto> {
    const params = new HttpParams().set('precio', precio.toString());
    return this.http.post<Presupuesto>(
      `${this.baseUrl}/solicitud/${solicitudId}`,
      null,            // cuerpo vacío
      { params }       // precio como query‐param
    );
  }

  actualizarPrecio(id: number, precio: number): Observable<Presupuesto> {
    return this.http.put<Presupuesto>(
      `${this.baseUrl}/${id}/precio?precio=${precio}`,
      null
    );
  }

  cambiarEstado(id: number, estado: string): Observable<Presupuesto> {
    return this.http.patch<Presupuesto>(
      `${this.baseUrl}/${id}/estado?estado=${encodeURIComponent(estado)}`,
      null
    );
  }
}
