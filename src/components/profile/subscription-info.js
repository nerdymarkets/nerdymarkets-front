import { ListGroupItem, Badge, Button } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import CancelSubscription from '../subscription/cancel-subscription';
import PaymentInfo from './payment-info';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import ChangeSubscriptionPlan from '../subscription/change-subscription-plan';
const SubscriptionInfo = ({ toggle }) => {
  const { subscriptionStatus, planType } = useSubscriptionStore();

  // const router = useRouter();
  // const handelNavigateToChangePlan = () => {
  //   toggle();
  //   router.push('/change-plan');
  // };
  return (
    <>
      <ListGroupItem className="text-center">
        <strong>Subscriptions</strong>
        <div className="flex items-center gap-2 justify-center">
          {subscriptionStatus ? (
            <>
              <Badge
                pill
                color="warning"
                className={`uppercase ${subscriptionStatus === 'approval_pending' ? '' : 'bg-customPink-important'}`}
              >
                {subscriptionStatus}
              </Badge>
              <Badge pill className="  bg-customPink-important uppercase">
                {planType}
              </Badge>
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
          <div className="flex justify-center items-center gap-2">
            <CancelSubscription
              buttonName="Cancel Subscription"
              toggle={toggle}
              color="danger"
            />
            {/* <Button
              size="sm"
              color="primary"
              className="text-white rounded-3xl font-bold shadow-lg border-none"
              onClick={handelNavigateToChangePlan}
            >
              {planType === 'monthly'
                ? 'Switch to Yearly'
                : 'Switch to Monthly'}
            </Button> */}
            <ChangeSubscriptionPlan />
          </div>
        )}
      </ListGroupItem>
    </>
  );
};
SubscriptionInfo.propTypes = {
  toggle: PropTypes.func.isRequired,
};
export default SubscriptionInfo;
