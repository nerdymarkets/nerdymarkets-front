import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

const PasswordValidation = ({ validations }) => {
  return (
    <ListGroup className="mt-2 text-xs ">
      {validations.map((validation) => (
        <ListGroupItem
          key={validation.message}
          className="flex items-center justify-between  text-darkGray font-bold"
        >
          {validation.message}
          <FontAwesomeIcon
            icon={faShieldAlt}
            className={twMerge(
              'w-6',
              validation.isValid ? 'text-success' : 'text-danger'
            )}
          />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

PasswordValidation.propTypes = {
  validations: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      isValid: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default PasswordValidation;
