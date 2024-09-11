import axios from 'axios';
import { backendBaseUrl } from '../../environments/environment';

export async function login(email, password) {
  const response = await axios.post(`${backendBaseUrl}/auth/login`, {
    email,
    password,
  });
  return response.data;
}

export async function register(firstname, lastname, email, password) {
  try {
    const response = await axios.post(`${backendBaseUrl}/auth/register`, {
      firstname,
      lastname,
      email,
      password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function verify(email, code) {
  try {
    const response = await axios.post(`${backendBaseUrl}/auth/verify`, {
      email,
      code,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function changePassword(token, oldPassword, newPassword) {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/auth/change-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Password change failed');
  }
}
export async function resetPassword(token, newPassword) {
  try {
    const response = await axios.post(`${backendBaseUrl}/auth/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Password reset failed');
  }
}
export async function sendPasswordResetLink(email) {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/auth/forgot-password`,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || 'Password reset link request failed'
    );
  }
}
export async function getUserSubscriptions(token) {
  try {
    const response = await axios.get(`${backendBaseUrl}/auth/subscriptions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch subscriptions'
    );
  }
}
export async function fetchAllComments(accessToken) {
  try {
    const response = await axios.get(`${backendBaseUrl}/auth/comments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}
