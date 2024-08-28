import { ListGroupItem, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

const UserInfo = ({ firstName, lastName, email, isVerified }) => {
  return (
    <>
      <ListGroupItem className="flex justify-center">
        <div className="flex ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <strong>Email: </strong>
              <p>{email}</p>
            </div>
          </div>
          {isVerified ? (
            <Badge color="success" pill className="ml-2">
              Verified
            </Badge>
          ) : (
            <Badge color="danger" pill className="ml-2">
              Unverified
            </Badge>
          )}
        </div>
      </ListGroupItem>
      <ListGroupItem className="flex justify-center  items-center gap-4 ">
        <p>
          <strong>First Name: </strong> {firstName}
        </p>
        <p>
          <strong>Last Name: </strong> {lastName}
        </p>
      </ListGroupItem>
    </>
  );
};
UserInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
};
export default UserInfo;
