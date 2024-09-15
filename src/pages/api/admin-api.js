import axios from 'axios';
import { backendBaseUrl } from '../../environments/environment';
export async function fetchAdminDashboard(accessToken) {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}
export async function cancelSubscription(
  accessToken,
  subscriptionId,
  userId,
  method
) {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/admin/cancel/${subscriptionId}`,
      { userId, method },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response;
  }
}
export async function activateUserSubscription(accessToken, userId, isActive) {
  try {
    const response = await axios.patch(
      `${backendBaseUrl}/admin/activate-subscription/${userId}`,
      { isActive },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    return error.response;
  }
}
