import { create } from 'zustand';

const useSubscriptionStore = create((set) => ({
  subscriptionDetails: null,
  subscriptionStatus: null,
  planType: null,
  isPaypalActive: false,
  isStripeActive: false,

  setSubscriptionDetails: (details) =>
    set((state) => ({
      subscriptionDetails: details ?? state.subscriptionDetails,
      subscriptionStatus:
        details?.status?.toLowerCase() ?? state.subscriptionStatus,
      planType: details?.planType?.toLowerCase() ?? state.planType,
      isPaypalActive: details?.isPaypalActive ?? state.isPaypalActive,
      isStripeActive: details?.isStripeActive ?? state.isStripeActive,
    })),
}));

export default useSubscriptionStore;
