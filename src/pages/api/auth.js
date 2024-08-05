import axios from 'axios';
import { loginUrl } from '../../environments/environment';

export async function login(username, password) {
  const response = await axios.post(`${loginUrl}/auth/login`, {
    username,
    password,
  });
  return response.data;
}
export async function register(username, password) {
  try {
    const response = await axios.post(`${loginUrl}/auth/register`, {
      username,
      password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
