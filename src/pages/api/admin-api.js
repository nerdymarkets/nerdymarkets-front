import axios from 'axios';
import { loginUrl } from '../../environments/environment';
export async function fetchAdminMetrics(accessToken) {
  try {
    const response = await axios.get(`${loginUrl}/admin/metrics`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}
