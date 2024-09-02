import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'reactstrap';
const NotAuthenticatedMessage = () => {
  return (
    <Container className="flex flex-col items-center justify-center min-h-screen text-center">
      <FontAwesomeIcon
        icon={faLock}
        size="3x"
        className="text-red-500 mb-4 w-10"
      />

      <h1 className="text-3xl font-semibold text-red-500 mb-2">
        You are not authenticated!
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        Please log in to access your portfolio and subscription details.
      </p>
    </Container>
  );
};

export default NotAuthenticatedMessage;
