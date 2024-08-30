import { faCcPaypal, faCcStripe } from '@fortawesome/free-brands-svg-icons';
import { Button, ListGroupItem, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSubscriptionStore from '@/stores/subscription-store';
import CancelSubscription from '../subscription/cancel-subscription';
const PaymentInfo = () => {
  const {
    isPaypalActive,
    isStripeActive,
    subscriptionDetails,
    subscriptionStatus,
  } = useSubscriptionStore();

  const handleFinishSubscriptionClick = () => {
    if (subscriptionDetails?.approvalUrl) {
      window.location.href = subscriptionDetails.approvalUrl;
    }
  };
  return (
    <>
      {isPaypalActive ? (
        <ListGroupItem className="flex items-center border-none gap-2 ">
          <FontAwesomeIcon
            icon={faCcPaypal}
            className="py-2 text-primary w-20"
          />
          {subscriptionStatus === 'approval_pending' && (
            <>
              <Button
                onClick={handleFinishSubscriptionClick}
                color="warning"
                className="  border-none text-white  rounded-3xl font-bold"
                size="sm"
              >
                Finish
              </Button>
              <CancelSubscription buttonName="Cancel" />
            </>
          )}
        </ListGroupItem>
      ) : isStripeActive ? (
        <FontAwesomeIcon
          icon={faCcStripe}
          className=" py-2 text-primary w-20"
        />
      ) : (
        <Badge color="danger">No active payment method</Badge>
      )}
    </>
  );
};

export default PaymentInfo;
