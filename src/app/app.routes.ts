import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { rolesGuard } from './auth/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [rolesGuard],
        data: {
          roles: ['ADMIN','USER'],
        },
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'salas',
        canActivate: [rolesGuard],
        data: {
          roles: ['ADMIN']
        },
        loadComponent: () => import('./salas/salas.component').then(m => m.SalasComponent)
      },
      {
        path: 'profesionales',
        canActivate: [rolesGuard],
        data: {
          roles: ['ADMIN']
        },
        loadComponent: () => import('./profesionales/profesionales.component').then(m => m.ProfesionalesComponent)
      },
      {
        path: 'tutores',
        canActivate: [rolesGuard],
        data: {
          roles: ['ADMIN']
        },
        loadComponent: () => import('./tutores/tutores.component').then(m => m.TutoresComponent)
      },
      {
        path: 'pacientes',
        canActivate: [rolesGuard],
        data: { roles: ['ADMIN','USER'] },
        children: [
          {
            path: '',
            loadComponent: () => import('./pacientes/pacientes.component').then(m => m.PacientesComponent)
          },
          {
            path: 'nuevo',
            loadComponent: () => import('./pacientes/crear-paciente/crear-paciente.component').then(m => m.CrearPacienteComponent)
          }
        ]
      },
      {
        path: 'forbidden',
        loadComponent: () => import('./forbidden/forbidden.component').then(m => m.ForbiddenComponent)
      },
    ]
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
