import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { captureSubscription } from '@/pages/api/paypal';
import { useSession } from 'next-auth/react';

const ReturnPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [subscriptionStatus, setSubscriptionStatus] = useState(
    'Processing your subscription...'
  );
  const [error, setError] = useState(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  useEffect(() => {
    const { subscription_id } = router.query;
    if (status === 'authenticated' && session?.accessToken && subscription_id) {
      captureSubscription(session.accessToken, subscription_id)
        .then((response) => {
          setSubscriptionStatus(
            'Subscription successfully activated and paid.'
          );
          setSubscriptionDetails(response);
        })
        .catch((error) => {
          setSubscriptionStatus('Failed to activate subscription.');
          setError(error);
        });
    } else if (status === 'unauthenticated') {
      setSubscriptionStatus('User is not authenticated.');
    }
  }, [router.query, session, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{subscriptionStatus}</h1>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {subscriptionDetails && (
        <div>
          <h2>Subscription Details:</h2>
          <p>
            <strong>ID:</strong> {subscriptionDetails.id}
          </p>
          <p>
            <strong>Status:</strong> {subscriptionDetails.status}
          </p>
          <p>
            <strong>Plan ID:</strong> {subscriptionDetails.plan_id}
          </p>
          <p>
            <strong>Start Time:</strong> {subscriptionDetails.start_time}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReturnPage;
