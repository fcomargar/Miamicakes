import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, Usuario } from '../../../service/auth.service';

interface LoginResponse {
  id: number;
  nombre: string;
  email: string;
  rol: 'USUARIO' | 'ADMINISTRADOR';
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,      // para routerLink o navegación programática
    HttpClientModule,  // necesario para HttpClient en componentes standalone
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../registro/registro.component.css']
})
export class LoginComponent {
  formularioLogin: FormGroup;
  cargando = false;
  mensaje: string = '';
  datosUsuario: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService       // Inyectamos el servicio de autenticación
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }

  iniciarSesion(): void {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const { email, contrasena } = this.formularioLogin.value;

    this.http.post<LoginResponse>(
      'http://localhost:8080/api/auth/login',
      { email, contrasena }
    ).subscribe({
      next: resp => {
        console.log('Respuesta completa del backend:', resp);

        // Construimos el objeto Usuario con id, nombre y email
        const usuario: Usuario = {
          id: resp.id,
          nombre: resp.nombre,
          email: resp.email,
          rol: resp.rol
        };

        // Guardamos en el servicio y en localStorage
        this.auth.setUsuario(usuario);
        this.datosUsuario = usuario;

        this.mensaje = `Bienvenido, ${resp.nombre}`;
        this.cargando = false;

        console.log('Usuario logueado:', this.datosUsuario);

        // Redirigir a dashboard tras login exitoso
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.mensaje = err.error?.error || 'Correo o contraseña incorrectos';
        this.cargando = false;
      }
    });
  }

  irARegistro(): void {
    this.router.navigate(['/registro']);
  }
}
