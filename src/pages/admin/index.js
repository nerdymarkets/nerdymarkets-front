import { getSession } from 'next-auth/react';
import { fetchAdminDashboard } from '@/pages/api/admin-api';
import { fetchAllComments } from '@/pages/api/auth';
import PropTypes from 'prop-types';
import UserStatisticsPieChart from '@/components/charts/user-statistics-pie-chart';
import { Container } from 'reactstrap';
import UserDetailsTable from '@/components/user-details/user-details-table';
import AdminComments from '@/components/admin-comments/admin.comments';

const AdminPage = ({ dashboard, comments }) => {
  if (!dashboard) {
    return <div>No data available</div>;
  }
  const { keyMetrics, userDetails } = dashboard;
  return (
    <div className="bg-black text-white min-h-screen ">
      <Container className="text-center  flex flex-col items-center">
        <h1 className="text-7xl"> Dashboard</h1>
        <UserStatisticsPieChart keyMetrics={keyMetrics} />
        <>
          <UserDetailsTable userDetails={userDetails} />
        </>

        <AdminComments initialComments={comments} />
      </Container>
    </div>
  );
};
AdminPage.propTypes = {
  dashboard: PropTypes.shape({
    keyMetrics: PropTypes.shape({
      totalActiveSubscribers: PropTypes.number.isRequired,
      totalUsers: PropTypes.number.isRequired,
    }),
    userDetails: PropTypes.array,
  }),
  comments: PropTypes.array,
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let dashboard = null;
  let comments = [];
  if (!session?.user.roles.includes('admin')) {
    return {
      props: { dashboard },
    };
  }
  dashboard = await fetchAdminDashboard(session.accessToken);
  comments = await fetchAllComments(session.accessToken);
  return {
    props: { dashboard: dashboard || null, comments: comments || [] },
  };
}

export default AdminPage;
