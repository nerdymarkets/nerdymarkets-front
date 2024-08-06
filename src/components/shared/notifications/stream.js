import { Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { NotificationEvent, NotificationType } from './notifciation-event';

export class NotificationClient {
  static eventStream = new Subject();

  static getEventStream() {
    return NotificationClient.eventStream;
  }

  static success(message) {
    NotificationClient.send(message, NotificationType.success);
  }

  static error(message) {
    NotificationClient.send(message, NotificationType.error);
  }

  static info(message) {
    NotificationClient.send(message, NotificationType.info);
  }

  static warning(message) {
    NotificationClient.send(message, NotificationType.warning);
  }

  static send(message, type) {
    NotificationClient.eventStream.next(
      new NotificationEvent(uuid(), message, type)
    );
  }
}
