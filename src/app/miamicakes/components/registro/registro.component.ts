// registro.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,      // <-- para poder usar routerLink o el router programático
  ],
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  formularioRegistro: FormGroup;
  mensaje: string = '';
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router         // <-- inyectamos el Router
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      repetirContrasena: ['', Validators.required]
    }, {
      validators: this.contrasenasIgualesValidator
    });

    // Limpiar error 'duplicado' al cambiar el email
    this.formularioRegistro.get('email')!.valueChanges.subscribe(() => {
      const e = this.formularioRegistro.get('email');
      if (e?.hasError('duplicado')) {
        e.setErrors(null);
      }
    });
    // Revalidar coincidencia de contraseñas al cambiarlas
    this.formularioRegistro.get('contrasena')!.valueChanges.subscribe(() =>
      this.formularioRegistro.updateValueAndValidity()
    );
    this.formularioRegistro.get('repetirContrasena')!.valueChanges.subscribe(() =>
      this.formularioRegistro.updateValueAndValidity()
    );
  }

  registrarUsuario() {
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched();
      this.mensaje = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    const { nombre, email, contrasena } = this.formularioRegistro.value;
    const datos = { nombre, email, contrasena };

    console.log('Payload registro ⇒', datos);

    this.http.post('/api/usuarios', datos).subscribe({
      next: () => {
        this.mensaje = 'Registro exitoso. ¡Bienvenido a Miami Cakes!';
        this.formularioRegistro.reset();
      },
      error: err => {
        this.cargando = false;
        console.error('Error al registrar usuario:', err);
        if (err.status === 0) {
          this.mensaje = 'No se pudo conectar con el servidor.';
        } else if (err.status === 409) {
          this.mensaje = 'Ya existe una cuenta con ese correo.';
          this.formularioRegistro.get('email')?.setErrors({ duplicado: true });
        } else {
          this.mensaje = `Error (${err.status}): ${err.error?.message || err.statusText}`;
        }
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }

  /**
   * Valida que 'contrasena' y 'repetirContrasena' coincidan.
   */
  private contrasenasIgualesValidator(group: FormGroup) {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('repetirContrasena')?.value;
    return pass === confirm ? null : { contrasenasNoCoinciden: true };
  }

  /**
   * Navega a la página de login
   */
  irALogin() {
    this.router.navigate(['/login']);
  }
}
