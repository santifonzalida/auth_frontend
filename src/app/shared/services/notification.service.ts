import { Injectable, signal } from '@angular/core';

export type NotificationType = 'error' | 'warning' | 'info' | 'success';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  private nextId = 0;

  show(message: string, type: NotificationType = 'error', duration = 4000): void {
    const id = this.nextId++;
    this._notifications.update(n => [...n, { id, type, message }]);
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  dismiss(id: number): void {
    this._notifications.update(n => n.filter(notif => notif.id !== id));
  }

  error(message: string, duration?: number): void   { this.show(message, 'error', duration); }
  warning(message: string, duration?: number): void { this.show(message, 'warning', duration); }
  info(message: string, duration?: number): void    { this.show(message, 'info', duration); }
  success(message: string, duration?: number): void { this.show(message, 'success', duration); }
}
