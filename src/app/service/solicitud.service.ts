// src/app/service/solicitud.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SolicitudPresupuestoDTO {
  id: number;
  usuarioId: number;
  usuarioNombre: string;
  usuarioEmail: string;
  tamano: string;
  sabor: string;
  tema: string;
  mensaje?: string;
  telefono: string;
  direccion: string;
  estado: string;
  fechaCreacion: string;
  // presupuestos…
}

export interface CrearSolicitudDTO {
  usuarioId: number;
  tamano: string;
  sabor: string;
  tema: string;
  mensaje?: string;
  telefono: string;
  direccion: string;
}

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  private baseUrl = 'http://localhost:8080/api/solicitudes';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<SolicitudPresupuestoDTO[]> {
    return this.http.get<SolicitudPresupuestoDTO[]>(this.baseUrl);
  }

  cambiarEstado(
    id: number,
    nuevoEstado: 'ACEPTADA' | 'RECHAZADA'
  ): Observable<SolicitudPresupuestoDTO> {
    return this.http.patch<SolicitudPresupuestoDTO>(
      `${this.baseUrl}/${id}/estado`,
      { estado: nuevoEstado }
    );
  }

  crear(dto: CrearSolicitudDTO): Observable<SolicitudPresupuestoDTO> {
    return this.http.post<SolicitudPresupuestoDTO>(
      this.baseUrl,
      dto
    );
  }
}
