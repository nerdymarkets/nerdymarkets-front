import axios from 'axios';
import { backendBaseUrl } from '../../environments/environment';

export async function getS3Object(token, bucketName, key) {
  try {
    const response = await axios.get(`${backendBaseUrl}/s3/get-object`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        bucketName: bucketName,
        key: key,
      },
    });
    const csvData = response.data;
    return csvData;
  } catch (error) {
    return null;
  }
}
export async function getDailyData(token, bucketName, key) {
  try {
    const response = await axios.get(`${backendBaseUrl}/s3/get-daily-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        bucketName: bucketName,
        prefix: key,
      },
    });
    const csvData = response.data;
    return csvData;
  } catch (error) {
    return null;
  }
}
export async function getMonthlyData(token, bucketName, key) {
  try {
    const response = await axios.get(`${backendBaseUrl}/s3/get-monthly-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        bucketName: bucketName,
        prefix: key,
      },
    });
    const csvData = response.data;
    return csvData;
  } catch (error) {
    return null;
  }
}
