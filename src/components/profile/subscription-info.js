import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useSubscriptionStore from '@/stores/subscription-store';
const SubscriptionInfo = ({ id, item }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = () => setPopoverOpen(!popoverOpen);
  const getActiveSubscription = useSubscriptionStore((state) =>
    state.getActiveSubscription()
  );
  const activeSubscription = useSubscriptionStore(getActiveSubscription);

  if (!activeSubscription) {
    return null;
  }
  const {
    status,
    next_billing_time,
    planType,
    currentPeriodEnd,
    startDate,
    price,
    billing_info,
  } = activeSubscription;
  const formatDate = (date) => (date ? new Date(date).toLocaleString() : 'N/A');
  const formatPrice = () => {
    if (billing_info?.amount?.total && billing_info?.amount?.currency) {
      return `${billing_info?.amount?.currency}${parseFloat(billing_info?.amount?.total).toFixed(2)}`;
    }
    if (price) {
      const dollarPrice = price / 100;
      return `$${dollarPrice.toFixed(2)}`;
    }
    return 'N/A';
  };
  return (
    <>
      <Button
        id={`Popover${id}`}
        type="button"
        size="sm"
        className="m-2 bg-customPink border-none hover:bg-customPinkSecondary rounded-3xl"
        onClick={togglePopover}
      >
        {item.text}
      </Button>
      <Popover
        placement={item.placement}
        isOpen={popoverOpen}
        target={`Popover${id}`}
        toggle={togglePopover}
      >
        <PopoverHeader>Subscription Details</PopoverHeader>
        <PopoverBody>
          <div>
            <strong>Next Charge Date:</strong>
            <p>{formatDate(next_billing_time || currentPeriodEnd)}</p>
          </div>
          <div>
            <strong>Plan Type:</strong>
            <p className="uppercase">{planType || 'N/A'}</p>
          </div>
          <div>
            <strong>Subscription Status:</strong>
            <p className="uppercase">{status || 'N/A'}</p>
          </div>
          <div>
            <strong>Start Date:</strong>
            <p>{formatDate(startDate)}</p>
          </div>
          <div>
            <strong>Price:</strong>
            <p>{formatPrice()}</p>
          </div>
          {status === 'approval_pending' && (
            <div>
              <strong>Action Required:</strong>
              <p>Please complete the subscription approval process.</p>
            </div>
          )}
        </PopoverBody>
      </Popover>
    </>
  );
};

SubscriptionInfo.propTypes = {
  id: PropTypes.number.isRequired,
  item: PropTypes.shape({
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    text: PropTypes.string,
  }).isRequired,
};

export default SubscriptionInfo;
