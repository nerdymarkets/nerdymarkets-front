import axios from 'axios';
import { loginUrl } from '../../environments/environment';

export async function login(username, password) {
  const response = await axios.post(`${loginUrl}/auth/login`, {
    username,
    password,
  });
  return response.data;
}
