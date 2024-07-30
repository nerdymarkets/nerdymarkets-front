import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSession, signOut } from 'next-auth/react';

const Profile = ({ session }) => {
  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await getSession();
      if (!currentSession) {
        signOut();
      }
    };

    const interval = setInterval(checkSession, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {session.user.name}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

Profile.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Profile;
