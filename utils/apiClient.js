import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';
import { TOKEN_COOKIE_KEY } from '../store/auth';

export default function createAPIClient() {
  const client = axios.create({
    baseURL: config.API_URL
  });

  client.interceptors.request.use((config) => {
    let user;
    if (typeof window !== 'undefined') {
      user = Cookies.get(TOKEN_COOKIE_KEY);
    }

    if (user)
      config.headers = {
        Authorization: `JWT ${JSON.parse(user).token}`
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
