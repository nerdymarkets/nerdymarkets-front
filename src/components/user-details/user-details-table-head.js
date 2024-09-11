import PropTypes from 'prop-types';

const UserDetailsTableHead = ({ onSort, sortAsc }) => (
  <thead>
    <tr>
      <th>User ID</th>
      <th>Email</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Last Login</th>
      <th>Logins per Week</th>
      <th>Registration Date</th>
      <th onClick={onSort} style={{ cursor: 'pointer' }}>
        Active Subscription{' '}
        {sortAsc ? <span>&uarr;</span> : <span>&darr;</span>}
      </th>
    </tr>
  </thead>
);

UserDetailsTableHead.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortAsc: PropTypes.bool.isRequired,
};

export default UserDetailsTableHead;
