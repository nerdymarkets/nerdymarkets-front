import axios from 'axios';
import { loginUrl } from '../../environments/environment';

export async function login(email, password) {
  const response = await axios.post(`${loginUrl}/auth/login`, {
    email,
    password,
  });
  return response.data;
}

export async function register(
  firstname,
  lastname,
  email,
  dateOfBirth,
  password
) {
  try {
    const response = await axios.post(`${loginUrl}/auth/register`, {
      firstname,
      lastname,
      email,
      dateOfBirth,
      password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function verify(email, code) {
  try {
    const response = await axios.post(`${loginUrl}/auth/verify`, {
      email,
      code,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function refreshToken(token) {
  try {
    const response = await axios.post(`${loginUrl}/auth/refresh-token`, {
      token,
    });
    return response.data;
  } catch (error) {
    throw new Error('Token refresh failed');
  }
}
export async function changePassword(token, oldPassword, newPassword) {
  try {
    const response = await axios.post(
      `${loginUrl}/auth/change-password`,
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
    const response = await axios.post(`${loginUrl}/auth/reset-password`, {
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
    const response = await axios.post(`${loginUrl}/auth/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || 'Password reset link request failed'
    );
  }
}
