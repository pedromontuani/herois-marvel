import axios from 'axios';
import { API_URL } from '~/config';
import { stringMd5 } from 'react-native-quick-md5';
import store from '~/store';

export default () => {
  const state = store.getState();
  const { API_PRIVATE_KEY, API_PUBLIC_KEY } = state.config;

  const instance = axios.create({
    baseURL: API_URL
  });

  const ts = Date.now();
  const hash = stringMd5(`${ts}${API_PRIVATE_KEY}${API_PUBLIC_KEY}`);

  instance.interceptors.request.use(
    config => ({
      ...config,
      params: {
        ...config.params,
        ts,
        apikey: API_PUBLIC_KEY,
        hash
      }
    }),
    error => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance;
};
