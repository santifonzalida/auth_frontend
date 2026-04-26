import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PacientesService } from '../services/pacientes.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crear-paciente.component.html',
})
export class CrearPacienteComponent {
  private readonly fb            = inject(FormBuilder);
  private readonly pacientesService = inject(PacientesService);
  private readonly router        = inject(Router);
  private readonly notifications = inject(NotificationService);

  isSubmitting = signal(false);

  form = this.fb.group({
    nombre:           ['', Validators.required],
    apellido:         ['', Validators.required],
    fechaNacimiento:  ['', Validators.required],
    dni:              ['', Validators.required],
    email:            ['', Validators.email],
    telefono:         [''],
  });

  fieldHasError(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const v = this.form.getRawValue();

    this.pacientesService.create({
      nombre:          v.nombre!,
      apellido:        v.apellido!,
      fechaNacimiento: v.fechaNacimiento!,
      dni:             v.dni!,
      email:           v.email   || undefined,
      telefono:        v.telefono || undefined,
    }).subscribe({
      next: () => {
        this.notifications.success('Paciente registrado exitosamente.', 5000);
        this.router.navigate(['/pacientes']);
      },
      error: () => this.isSubmitting.set(false),
    });
  }
}