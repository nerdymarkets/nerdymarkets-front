import axios from 'axios';
import { backendBaseUrl } from '../../environments/environment';

export async function createStripePaymentMethod(
  token,
  paymentMethodId,
  customerId
) {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/stripe-payments/create-payment-method`,
      {
        paymentMethodId,
        customerId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function createStripeSubscription(
  token,
  paymentMethodId,
  planId,
  planType
) {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/stripe-subscriptions/create`,
      {
        planId,
        paymentMethodId,
        planType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getStripeSubscriptionById(subscriptionId, token) {
  try {
    const response = await axios.get(
      `${backendBaseUrl}/stripe-subscriptions/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export async function cancelStripeSubscription(token, stripeSubscriptionId) {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/stripe-subscriptions/cancel/${stripeSubscriptionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export async function deleteStripeSubscription(token, subscriptionId) {
  try {
    const response = await axios.delete(
      `${backendBaseUrl}/stripe-subscriptions/delete/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
}
export async function changeStripeSubscriptionPlan(token, newPlanId) {
  try {
    const response = await axios.patch(
      `${backendBaseUrl}/stripe-subscriptions/change-plan`,
      {
        newPlanId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
