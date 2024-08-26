import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchAdminMetrics } from '@/pages/api/admin-api';
const AdminPage = () => {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState(null);
  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await fetchAdminMetrics(session.accessToken);
      setMetrics(data);
    };

    if (session?.user.roles.includes('admin')) {
      fetchMetrics();
    }
  }, [session]);

  if (!session?.user.roles.includes('admin')) {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {metrics ? (
        <div>
          <p>Total Users: {metrics.totalUsers}</p>
        </div>
      ) : (
        <p>Loading metrics...</p>
      )}
    </div>
  );
};

export default AdminPage;
