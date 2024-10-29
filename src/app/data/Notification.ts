export enum NotificationType {
  info = 'info',
  error = 'error',
  warn= 'warn',
  success = 'success',
}

export interface MaNotification {
  title: string;
  message: string;
  type: NotificationType;
}
