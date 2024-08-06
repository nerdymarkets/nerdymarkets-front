import { useState, useEffect } from 'react';
import Notification from './notification';
import { NotificationClient } from './stream';

export function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const subscription = NotificationClient.getEventStream().subscribe(
      (event) => {
        setNotifications((prev) => [...prev, event]);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
