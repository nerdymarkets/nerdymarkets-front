import axios from 'axios';
import { loginUrl } from '../../environments/environment';

export async function createSubscription(token, planId, subscriber) {
  try {
    const response = await axios.post(
      `${loginUrl}/paypalsubscriptions/create`,
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
      `${loginUrl}/paypalsubscriptions/capture`,
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
      `${loginUrl}/paypalsubscriptions/${subscriptionId}`,
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
      `${loginUrl}/paypalsubscriptions/user/status`,
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
      `${loginUrl}/paypalsubscriptions/cancel/${subscriptionId}`,
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
      `${loginUrl}/paypalsubscriptions/delete/${subscriptionId}`,
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
      `${loginUrl}/paypalsubscriptions/change-plan`,
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
