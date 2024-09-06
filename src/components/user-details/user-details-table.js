import { useState } from 'react';
import { Table, Popover, PopoverBody, Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { formatDate } from '@/utils/fomrat-date';
import { cancelSubscription } from '@/pages/api/admin-api';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
const UserDetailsTable = ({ userDetails }) => {
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
      toast.success('Subscription Canceld Succsesfulyy');
    } catch (err) {
      toast.error('Failed to Cancel User Subscription');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-20 p-4 rounded-3xl ">
      <Table
        dark
        hover
        responsive
        className="text-white mb-0"
        style={{
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Last Login</th>
            <th>Logins per Week</th>
            <th>Active Subscription</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user) => {
            return (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.email}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{formatDate(user.lastLogin)}</td>
                <td>{user.loginsPerWeek}</td>
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
                              {user.activeSubscription.details
                                .paypalSubscriptionId ||
                                user.activeSubscription.details
                                  .stripeSubscriptionId}
                            </p>
                            <p>
                              <strong> Plan: </strong>{' '}
                              {user.activeSubscription.details.plan}
                            </p>
                            <p>
                              <strong> Start Date:</strong>{' '}
                              {formatDate(
                                user.activeSubscription.details.startDate
                              )}
                            </p>
                            <p>
                              <strong> Next Charge:</strong>{' '}
                              {formatDate(
                                user.activeSubscription.details
                                  .next_billing_time ||
                                  user.activeSubscription.details
                                    .currentPeriodEnd
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
                    // If user doesn't have an active subscription, you can render something else or nothing at all.
                    <span>No active subscription</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
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
      activeSubscription: PropTypes.shape({
        type: PropTypes.string.isRequired,
        details: PropTypes.shape({
          planType: PropTypes.string.isRequired,
          next_billing_time: PropTypes.string,
          currentPeriodEnd: PropTypes.string,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default UserDetailsTable;
