import axios from 'axios';
import { Message } from 'element-ui';
import CookieService from '@/util/CookieService';
import { baseUrl } from '@/config/baseUrl';

const service = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
});

// request interceptors
service.interceptors.request.use(
  (config) => {
    if (config.url.indexOf('login') === -1) {
      config.headers.Authorization = CookieService.getCookie('_token');
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// response interceptors
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status !== 200 && res.status !== 200) {
      Message.error(res.message);
      return false;
    }
    return res;
  },
  (err) => {
    if (err.response && err.response.data) {
      return Promise.reject(err.response.data);
    }
    return Promise.reject(err);
  }
);

export default service;
