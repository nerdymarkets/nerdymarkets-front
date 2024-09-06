import axios from 'axios';
import { backendBaseUrl } from '../../environments/environment';

export async function createSubscription(token, planId, subscriber) {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/paypalsubscriptions/create`,
      {
        planId,
        givenName: subscriber.given_name,
        surname: subscriber.surname,
        email: subscriber.email_address,
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
    return error.response;
  }
}

export async function captureSubscription(token, subscriptionId) {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/paypalsubscriptions/capture`,
      {
        subscriptionId,
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
    return error.response;
  }
}
export async function getPaypalSubscriptionById(subscriptionId, token) {
  try {
    const response = await axios.get(
      `${backendBaseUrl}/paypalsubscriptions/${subscriptionId}`,
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
export async function getPaypalSubscriptionStatus(token) {
  try {
    const response = await axios.get(
      `${backendBaseUrl}/paypalsubscriptions/user/status`,
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
export async function cancelPaypalSubscription(token, subscriptionId) {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/paypalsubscriptions/cancel/${subscriptionId}`,
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

export async function deletePaypalSubscription(token, subscriptionId) {
  try {
    const response = await axios.delete(
      `${backendBaseUrl}/paypalsubscriptions/delete/${subscriptionId}`,
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
export async function changePaypalSubscriptionPlan(
  token,
  newPlanId,
  subscriber
) {
  try {
    const response = await axios.patch(
      `${backendBaseUrl}/paypalsubscriptions/change-plan`,
      {
        newPlanId,
        subscriber,
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
    return error.response;
  }
}
