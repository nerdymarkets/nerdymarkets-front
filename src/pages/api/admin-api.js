import axios from 'axios';
import { loginUrl } from '../../environments/environment';
export async function fetchAdminDashboard(accessToken) {
  try {
    const response = await axios.get(`${loginUrl}/admin/dashboard`, {
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
      `${loginUrl}/admin/cancel/${subscriptionId}`,
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
