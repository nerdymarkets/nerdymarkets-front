import { ListGroupItem, Badge } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import CancelSubscription from '../subscription/cancel-subscription';
import PaymentInfo from './payment-info';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import ChangeSubscriptionPlan from '../subscription/change-subscription-plan';
import SubscriptionInfo from './subscription-info';
const Subscription = ({ toggle }) => {
  const { subscriptionStatus } = useSubscriptionStore();
  // const router = useRouter();
  // const handelNavigateToChangePaymentMethod = () => {
  //   toggle();
  //   router.push('/change-payment-method');
  // };

  return (
    <>
      <ListGroupItem className="text-center">
        <strong>Subscriptions</strong>
        <div className="flex items-center gap-2 justify-center">
          {subscriptionStatus ? (
            <>
              <SubscriptionInfo
                id={0}
                item={{
                  placement: 'top',
                  text: 'View Subscription Details',
                }}
              />
            </>
          ) : (
            <Badge color="danger" pill className="ml-2 my-2">
              Inactive
            </Badge>
          )}
        </div>
        <div className="flex justify-center">
          <PaymentInfo />
        </div>

        {subscriptionStatus === 'active' && (
          <>
            <div className="flex justify-center items-center gap-2 py-2">
              <CancelSubscription
                buttonName="Cancel Subscription"
                toggle={toggle}
                color="danger"
              />
              <ChangeSubscriptionPlan />
            </div>
            {/* <div>
              <Button
                size="sm"
                color="primary"
                className="text-white rounded-3xl font-bold shadow-lg border-none"
                onClick={handelNavigateToChangePaymentMethod}
              >
                Change Payment Method
              </Button>
            </div> */}
          </>
        )}
      </ListGroupItem>
    </>
  );
};
Subscription.propTypes = {
  toggle: PropTypes.func.isRequired,
};
export default Subscription;
