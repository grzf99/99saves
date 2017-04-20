import axios from 'axios'
import config from '../config'

export default function createAPIClient (token) {
  const client = axios.create({
    baseURL: config.API_URL,
    headers: {
      Authorization: `JWT ${token}`
    }
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const data = error.response !== undefined ? error.response.data : error
      return Promise.reject(data);
    }
  );

  return client;
}
