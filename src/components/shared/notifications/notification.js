import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification({ notification }) {
  useEffect(() => {
    if (notification) {
      toast[notification.type](notification.message, {
        autoClose: 3000,
        position: 'top-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    }
  }, [notification]);

  return <ToastContainer transition={Slide} />;
}

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default Notification;
