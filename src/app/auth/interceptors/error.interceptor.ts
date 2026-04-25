import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router        = inject(Router);
  const authService   = inject(AuthService);
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 0:
          notifications.error('Sin conexión con el servidor. Verificá tu conexión a internet.');
          break;

        case 401:
          notifications.warning('Tu sesión expiró. Por favor iniciá sesión nuevamente.');
          authService.logout();
          break;

        case 403:
          notifications.error('No tenés permisos para realizar esta acción.');
          router.navigate(['/forbidden']);
          break;

        case 404:
          notifications.error('El recurso solicitado no fue encontrado.');
          break;

        case 400:
        case 422: {
          const raw = error.error;
          const msg = typeof raw === 'string'
            ? raw
            : (raw?.message ?? raw?.mensaje ?? 'Los datos enviados no son válidos.');
          notifications.error(Array.isArray(msg) ? msg.join(', ') : msg);
          break;
        }

        default:
          if (error.status >= 500) {
            notifications.error('Error en el servidor. Por favor intentá más tarde.');
          }
          break;
      }

      return throwError(() => error);
    })
  );
};
