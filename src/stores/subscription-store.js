import { create } from 'zustand';

const useSubscriptionStore = create((set) => ({
  subscriptionDetails: null,
  subscriptionStatus: null,
  planType: null,
  isPaypalActive: false,
  isStripeActive: false,
  isManuallyActivated: false,
  loading: false,

  setSubscriptionDetails: (details) => {
    const isPaypalActive = details?.isPaypalActive ?? false;
    const isStripeActive = details?.isStripeActive ?? false;
    const isManuallyActivated = details?.isManuallyActivated ?? false;
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
      isManuallyActivated,
      loading: false,
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
  setLoading: (isLoading) => set({ loading: isLoading }),

  // Computed property to get the active subscription details
  getActiveSubscription: () => {
    return (state) => {
      if (state.isPaypalActive) {
        return state.subscriptionDetails?.paypalSubscriptions?.[0] ?? null;
      } else if (state.isStripeActive) {
        return state.subscriptionDetails?.stripeSubscriptions?.[0] ?? null;
      }
      return null;
    };
  },
}));

export default useSubscriptionStore;
