import axios from 'axios';
import config from '../config';

export default function createAPIClient(store) {
  const client = axios.create({
    baseURL: config.API_URL
  });

  client.interceptors.request.use((config) => {
    const { token } = store.getState().currentUser;
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
