import { createSubscription } from '@/pages/api/paypal';
import { useSession } from 'next-auth/react';
import { NotificationClient } from '@/components/shared/notifications/stream';

const Paypal = () => {
  const { data: session } = useSession();
  const planId = 'P-1E587393J1454482RM27XRMI';
  // const planId = 'P-4MA25770WY783122SM22NYCQ'; test version
  const handleSubmit = async (e) => {
    e.preventDefault();
    const subscriber = {
      given_name: session.firstname,
      surname: session.lastname,
      email_address: session.email,
    };
    const response = await createSubscription(
      session.accessToken,
      planId,
      subscriber
    );

    if (response && response.approvalUrl) {
      window.location.href = response.approvalUrl;
    } else {
      NotificationClient.error('Approval URL not found in the response:');
    }
  };

  return (
    <>
      <button onClick={handleSubmit}>Subscribe with Paypal</button>
    </>
  );
};

export default Paypal;
