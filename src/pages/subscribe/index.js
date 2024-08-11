import { useState } from 'react';
import { createSubscription } from '@/pages/api/paypal';
import { useSession } from 'next-auth/react';
import { NotificationClient } from '@/components/shared/notifications/stream';
export default function Subscribe() {
  const [planId, setPlanId] = useState('');
  const [givenName, setGivenName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subscriber = {
      given_name: givenName,
      surname: surname,
      email_address: email,
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Plan ID"
        value={planId}
        onChange={(e) => setPlanId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="First Name"
        value={givenName}
        onChange={(e) => setGivenName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}
