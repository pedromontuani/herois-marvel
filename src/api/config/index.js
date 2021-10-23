import axios from 'axios';
import { API_URL, PUBLIC_KEY, PRIVATE_KEY } from '~/config';
import { setLoading } from '~/store/modules/loading/slice';
import { stringMd5 } from 'react-native-quick-md5';
import store from '~/store';

export default () => {
  const instance = axios.create({
    baseURL: API_URL
  });

  store.dispatch(setLoading(true));

  const ts = Date.now();
  const hash = stringMd5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);

  instance.interceptors.request.use(
    config => ({
      ...config,
      params: {
        ...config.params,
        ts,
        apikey: PUBLIC_KEY,
        hash
      }
    }),
    error => {
      store.dispatch(setLoading(false));
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      store.dispatch(setLoading(false));
      return response;
    },
    error => {
      store.dispatch(setLoading(false));
      return Promise.reject(error);
    }
  );

  return instance;
};
