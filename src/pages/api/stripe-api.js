import axios from 'axios';
import { loginUrl } from '../../environments/environment';

export async function createStripePaymentMethod(
  token,
  paymentMethodId,
  customerId
) {
  try {
    const response = await axios.post(
      `${loginUrl}/stripe-payments/create-payment-method`,
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
      `${loginUrl}/stripe-subscriptions/create`,
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
      `${loginUrl}/stripe-subscriptions/${subscriptionId}`,
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
      `${loginUrl}/stripe-subscriptions/cancel/${stripeSubscriptionId}`,
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
      `${loginUrl}/stripe-subscriptions/delete/${subscriptionId}`,
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
      `${loginUrl}/stripe-subscriptions/change-plan`,
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
