import { useState } from 'react';
import { Popover, PopoverBody, Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { formatDate } from '@/utils/fomrat-date';
import { cancelSubscription } from '@/pages/api/admin-api';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const UserDetailsTableBody = ({ userDetails }) => {
  const { data: session } = useSession();
  const [popoverOpen, setPopoverOpen] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePopover = (userId) => {
    setPopoverOpen((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const handleCancelSubscription = async (userId, subscriptionId, method) => {
    setLoading(true);

    try {
      await cancelSubscription(
        session.accessToken,
        subscriptionId,
        userId,
        method
      );
      toast.success('Subscription Canceled Successfully');
    } catch (err) {
      toast.error('Failed to Cancel User Subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <tbody>
      {userDetails.map((user) => (
        <tr key={user.userId}>
          <td>{user.userId}</td>
          <td>{user.email}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{formatDate(user.lastLogin)}</td>
          <td>{user.loginsPerWeek}</td>
          <td>
            {user.registrationDate ? formatDate(user.registrationDate) : 'N/A'}
          </td>
          <td>
            {user.activeSubscription ? (
              <>
                <span
                  id={`subscriptionType-${user.userId}`}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() => togglePopover(user.userId)}
                >
                  {user.activeSubscription.type}
                </span>
                <Popover
                  placement="top"
                  isOpen={popoverOpen[user.userId]}
                  target={`subscriptionType-${user.userId}`}
                  toggle={() => togglePopover(user.userId)}
                >
                  <PopoverBody>
                    <div>
                      <p>
                        <strong>Payment Method:</strong>{' '}
                        {user.activeSubscription.type}
                      </p>
                      <p>
                        <strong>Plan Type:</strong>{' '}
                        {user.activeSubscription.details.planType}
                      </p>
                      <p>
                        <strong>Status:</strong>{' '}
                        {user.activeSubscription.details.status}
                      </p>
                      <p>
                        <strong>Subscription ID:</strong>{' '}
                        {user.activeSubscription.details.paypalSubscriptionId ||
                          user.activeSubscription.details.stripeSubscriptionId}
                      </p>
                      <p>
                        <strong> Plan: </strong>{' '}
                        {user.activeSubscription.details.plan}
                      </p>
                      <p>
                        <strong> Start Date:</strong>{' '}
                        {formatDate(user.activeSubscription.details.startDate)}
                      </p>
                      <p>
                        <strong> Next Charge:</strong>{' '}
                        {formatDate(
                          user.activeSubscription.details.next_billing_time ||
                            user.activeSubscription.details.currentPeriodEnd
                        )}
                      </p>
                      <Button
                        color="danger"
                        onClick={() =>
                          handleCancelSubscription(
                            user.userId,
                            user.activeSubscription.details
                              .paypalSubscriptionId ||
                              user.activeSubscription.details
                                .stripeSubscriptionId,
                            user.activeSubscription.type
                          )
                        }
                        disabled={loading}
                      >
                        {loading ? (
                          <Spinner className="text-customPink" />
                        ) : (
                          'Cancel Subscription'
                        )}
                      </Button>
                    </div>
                  </PopoverBody>
                </Popover>
              </>
            ) : (
              <span>No active subscription</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

UserDetailsTableBody.propTypes = {
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

export default UserDetailsTableBody;
