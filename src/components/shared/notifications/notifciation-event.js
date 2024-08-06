export const NotificationType = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
};

export function NotificationEvent(id, message, type = NotificationType.info) {
  this.id = id;
  this.message = message;
  this.type = type;
}
