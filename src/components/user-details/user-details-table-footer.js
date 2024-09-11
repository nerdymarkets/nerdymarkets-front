import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const UserDetailsTableFooter = ({
  totalUsers,
  usersPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    onPageChange(pageNumber);
  };

  return (
    <Pagination className="d-flex justify-content-center ">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => handlePageChange(currentPage - 1)}
        />
      </PaginationItem>
      {[...Array(totalPages)].map((_, index) => (
        <PaginationItem active={currentPage === index + 1} key={index}>
          <PaginationLink onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink
          next
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </PaginationItem>
    </Pagination>
  );
};

UserDetailsTableFooter.propTypes = {
  totalUsers: PropTypes.number.isRequired,
  usersPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default UserDetailsTableFooter;
