import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'salas',
        loadComponent: () => import('./salas/salas.component').then(m => m.SalasComponent)
      },
      {
        path: 'profesionales',
        loadComponent: () => import('./profesionales/profesionales.component').then(m => m.ProfesionalesComponent)
      },
      {
        path: 'tutores',
        loadComponent: () => import('./tutores/tutores.component').then(m => m.TutoresComponent)
      },
      {
        path: 'pacientes',
        loadComponent: () => import('./pacientes/pacientes.component').then(m => m.PacientesComponent)
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
