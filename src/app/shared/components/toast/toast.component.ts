import { Component, inject } from '@angular/core';
import { NotificationService, NotificationType } from '../../services/notification.service';

const STYLES: Record<NotificationType, string> = {
  error:   'bg-red-600 text-white',
  warning: 'bg-amber-500 text-white',
  info:    'bg-blue-600 text-white',
  success: 'bg-green-600 text-white',
};

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 opacity-65 flex flex-col gap-2 w-96 max-w-[calc(100vw-2rem)]">
      @for (n of svc.notifications(); track n.id) {
        <div
          role="alert"
          class="flex items-start gap-3 rounded-lg px-4 py-3 shadow-lg text-sm font-medium"
          [class]="typeClass(n.type)"
        >
          <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            @switch (n.type) {
              @case ('error') {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              }
              @case ('warning') {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              }
              @case ('info') {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              }
              @case ('success') {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              }
            }
          </svg>

          <p class="flex-1 leading-snug">{{ n.message }}</p>

          <button
            (click)="svc.dismiss(n.id)"
            class="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Cerrar notificación"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  protected readonly svc = inject(NotificationService);

  typeClass(type: NotificationType): string {
    return STYLES[type];
  }
}
