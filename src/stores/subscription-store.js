import { create } from 'zustand';

const useSubscriptionStore = create((set) => ({
  subscriptionDetails: null,
  subscriptionStatus: null,
  planType: null,
  isPaypalActive: false,
  isStripeActive: false,

  setSubscriptionDetails: (details) => {
    const isPaypalActive = details?.isPaypalActive ?? false;
    const isStripeActive = details?.isStripeActive ?? false;
    let subscriptionStatus = null;
    let planType = null;

    if (isPaypalActive) {
      subscriptionStatus =
        details?.paypalSubscriptions?.[0]?.status?.toLowerCase() ?? null;
      planType =
        details?.paypalSubscriptions?.[0]?.planType?.toLowerCase() ?? null;
    } else if (isStripeActive) {
      subscriptionStatus =
        details?.stripeSubscriptions?.[0]?.status?.toLowerCase() ?? null;
      planType =
        details?.stripeSubscriptions?.[0]?.planType?.toLowerCase() ?? null;
    }

    return set({
      subscriptionDetails: details ?? null,
      subscriptionStatus,
      planType,
      isPaypalActive,
      isStripeActive,
    });
  },

  clearSubscriptionDetails: () =>
    set({
      subscriptionDetails: null,
      subscriptionStatus: null,
      planType: null,
      isPaypalActive: false,
      isStripeActive: false,
    }),
}));

export default useSubscriptionStore;
