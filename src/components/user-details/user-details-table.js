import { useState } from 'react';
import { Table, Button, Container, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import UserDetailsTableHead from './user-details-table-head';
import UserDetailsTableBody from './user-details-table-body';
import UserDetailsTableFooter from './user-details-table-footer';

const UserDetailsTable = ({ userDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [sortedUserDetails, setSortedUserDetails] = useState(userDetails);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  const downloadCSV = () => {
    const csvContent = [
      ['First Name', 'Last Name', 'Email', 'Subscription Status'],
      ...userDetails.map((user) => [
        user.firstname,
        user.lastname,
        user.email,
        user.activeSubscription
          ? user.activeSubscription.type
          : 'Not Subscribed',
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'user_details.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUserDetails = sortedUserDetails.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.firstname.toLowerCase().includes(query) ||
      user.lastname.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const handleSortBySubscription = () => {
    const sortedData = [...sortedUserDetails].sort((a, b) => {
      const aHasSubscription = !!a.activeSubscription;
      const bHasSubscription = !!b.activeSubscription;
      return sortAsc
        ? aHasSubscription - bHasSubscription
        : bHasSubscription - aHasSubscription;
    });

    setSortAsc(!sortAsc);
    setSortedUserDetails(sortedData);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUserDetails.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  return (
    <Container className="mt-16">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/4"
        />
        <Button
          onClick={downloadCSV}
          className="flex m-4 bg-customPink hover:bg-customPinkSecondary border-none"
        >
          Download CSV
        </Button>
      </div>
      <Table
        dark
        hover
        responsive
        className="text-white"
        style={{
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
          overflow: 'hidden',
        }}
      >
        <UserDetailsTableHead
          onSort={handleSortBySubscription}
          sortAsc={sortAsc}
        />
        <UserDetailsTableBody userDetails={currentUsers} />
      </Table>
      <div className="flex justify-end">
        <UserDetailsTableFooter
          totalUsers={filteredUserDetails.length}
          usersPerPage={usersPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </Container>
  );
};

UserDetailsTable.propTypes = {
  userDetails: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      lastLogin: PropTypes.string.isRequired,
      loginsPerWeek: PropTypes.number.isRequired,
      registrationDate: PropTypes.string,
      activeSubscription: PropTypes.shape({
        type: PropTypes.string.isRequired,
        details: PropTypes.shape({
          planType: PropTypes.string.isRequired,
          status: PropTypes.string.isRequired,
          next_billing_time: PropTypes.string,
          currentPeriodEnd: PropTypes.string,
          paypalSubscriptionId: PropTypes.string,
          stripeSubscriptionId: PropTypes.string,
          plan: PropTypes.string.isRequired,
          startDate: PropTypes.string.isRequired,
        }).isRequired,
      }),
    })
  ).isRequired,
};

export default UserDetailsTable;
