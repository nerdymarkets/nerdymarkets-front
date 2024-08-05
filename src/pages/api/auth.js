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
