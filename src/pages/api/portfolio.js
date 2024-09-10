import axios from 'axios';
import { backendBaseUrl } from '../../environments/environment';

export async function getPerformanceData(token, type) {
  try {
    const response = await axios.get(`${backendBaseUrl}/s3/performance`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        type: type,
      },
    });
    const performanceData = response.data;
    return performanceData;
  } catch (error) {
    return null;
  }
}
export async function getLatestPortfolioData(token) {
  try {
    const response = await axios.get(`${backendBaseUrl}/s3/latest-portfolio`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const latestPortfolioData = response.data;
    return latestPortfolioData;
  } catch (error) {
    return null;
  }
}
