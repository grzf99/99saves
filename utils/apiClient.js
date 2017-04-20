import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';
import { TOKEN_COOKIE_KEY } from '../store/auth';

export default function createAPIClient(token) {
  const client = axios.create({
    baseURL: config.API_URL
  });

  client.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
      token = Cookies.get(TOKEN_COOKIE_KEY);
    }
    config.headers = {
      Authorization: `JWT ${token}`
    };
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const data = error.response !== undefined ? error.response.data : error;
      return Promise.reject(data);
    }
  );

  return client;
}
