import { Component, DestroyRef, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PacientesService } from './services/pacientes.service';
import { Paciente } from './models/paciente.model';
import { HasPermissionDirective } from '../auth/directive/hasPermission.directive';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [RouterLink, DatePipe, HasPermissionDirective],
  templateUrl: './pacientes.component.html',
})
export class PacientesComponent implements OnInit {
  private readonly pacientesService = inject(PacientesService);
  private readonly destroyRef = inject(DestroyRef);

  pacientes = signal<Paciente[]>([]);
  isLoading = signal(true);
  filterNombre = signal('');
  filterDni = signal('');

  filteredPacientes = computed(() => {
    const nombre = this.filterNombre().toLowerCase().trim();
    const dni = this.filterDni().toLowerCase().trim();
    return this.pacientes().filter(p => {
      const matchesNombre =
        !nombre ||
        p.nombre.toLowerCase().includes(nombre) ||
        p.apellido.toLowerCase().includes(nombre);
      const matchesDni = !dni || p.dni.toLowerCase().includes(dni);
      return matchesNombre && matchesDni;
    });
  });

  hasActiveFilters = computed(
    () => this.filterNombre().length > 0 || this.filterDni().length > 0
  );

  ngOnInit(): void {
    this.pacientesService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.pacientes.set(data);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
  }

  clearFilters(): void {
    this.filterNombre.set('');
    this.filterDni.set('');
  }
}