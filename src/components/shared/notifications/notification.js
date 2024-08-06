import { Alert } from 'reactstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Notification({ notification }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Alert
      color={notification.type}
      isOpen={visible}
      toggle={() => setVisible(false)}
    >
      {notification.message}
    </Alert>
  );
}

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default Notification;
