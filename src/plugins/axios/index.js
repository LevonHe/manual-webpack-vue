import axios from 'axios';
import CookieService from '@/util/CookieService';
import { baseUrl } from '@/config/baseUrl';

const service = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-cache',
    Pragma: 'no-cache',
  },
});

// request interceptors
service.interceptors.request.use(
  (config) => {
    if (config.url.indexOf('login') === -1) {
      const token = CookieService.getCookie('Business-Token');
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (err) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// response interceptors
service.interceptors.response.use(
  (response) => {
    const dataAxios = response.data;
    const { code } = dataAxios;
    if (code === undefined) {
      return dataAxios;
    } else {
      switch (code) {
        case 0:
          return dataAxios.data;
        case 'xxx':
          console.log(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`);
          break;
        default:
          console.log(`${dataAxios.msg}: ${response.config.url}`);
          break;
      }
    }
  },
  (error) => {
    if (error && error.response) {
      if (error.response.data) {
        return Promise.reject(error.response.data);
      }
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '未授权，请登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  }
);

export default service;
