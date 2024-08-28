import { ListGroupItem, Badge } from 'reactstrap';
import useSubscriptionStore from '@/stores/subscription-store';
import CancelSubscription from '../subscription/cancel-subscription';
import PaymentInfo from './payment-info';
import SwitchStripSubscription from '@/components/subscription/switch-strip-subscription';
const SubscriptionInfo = () => {
  const { subscriptionStatus, planType } = useSubscriptionStore();
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
                className={` p-2.5  uppercase ${subscriptionStatus === 'approval_pending' ? '' : 'bg-customPink-important'}`}
              >
                {subscriptionStatus}
              </Badge>
              <Badge pill className=" p-2.5 bg-customPink-important uppercase">
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
            <CancelSubscription buttonName="Cancel Subscription" />
            <SwitchStripSubscription />
          </div>
        )}
      </ListGroupItem>
    </>
  );
};

export default SubscriptionInfo;
