import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL_API } from '../utils/config';
import { storage } from '../utils/storage';

const $host = axios.create({
  baseURL: BASE_URL_API
});

const $authHost = axios.create({
  baseURL: BASE_URL_API
});

const authInterceptor = (config: AxiosRequestConfig) => {
  const token = storage.get('token');

  if (config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
  $host, $authHost
};
