import { showError } from './error-actions';
import axios from 'axios';
import { CustomStore } from '../reducers/reducer';

const SERVER = axios.create({ baseURL: 'http://localhost:3001' });

let store: CustomStore | null = null;

export const injectStoreToServer = (_store: CustomStore) => {
  store = _store;
};

SERVER.interceptors.response.use(
  (res) => {
    if (res.data.err) {
      store?.dispatch(
        showError(
          typeof res.data.err == 'string' ? res.data.err : JSON.stringify(res.data.err),
        ),
      );
      return Promise.reject(res.data.err);
    } else return res;
  },
  (error) => {
    store?.dispatch(showError(error.message));
  },
);

export default SERVER;
