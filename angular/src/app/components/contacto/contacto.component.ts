import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ErroresFormulario {
  nombre?: string;
  correo?: string;
  mensaje?: string;
}

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html'
})
export class ContactoComponent {
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';
  errores: ErroresFormulario = {};
  enviado: boolean = false;

  validarCorreo(email: string): boolean {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
  }

  onSubmit(): void {
    const nuevosErrores: ErroresFormulario = {};

    if (!this.nombre.trim()) {
      nuevosErrores.nombre = 'El campo nombre es obligatorio.';
    } else if (this.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!this.correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!this.validarCorreo(this.correo.trim())) {
      nuevosErrores.correo = 'Ingresa un correo electrónico con formato válido (ejemplo: usuario@correo.com).';
    }

    if (!this.mensaje.trim()) {
      nuevosErrores.mensaje = 'El campo mensaje es obligatorio.';
    } else if (this.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe contener al menos 10 caracteres.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      this.errores = nuevosErrores;
      this.enviado = false;
      return;
    }

    this.errores = {};
    this.enviado = true;
    this.nombre = '';
    this.correo = '';
    this.mensaje = '';
  }

  limpiarError(campo: keyof ErroresFormulario): void {
    if (this.errores[campo]) {
      delete this.errores[campo];
    }
  }
}
