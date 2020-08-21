import request from '@/plugins/axios';

// 登录
export const AccountLogin = (data) =>
  request({
    url: '/api/v1/login',
    method: 'POST',
    data,
  });

export const getUserRoles = () => {
  return request({
    url: '/api/business/user',
    method: 'GET',
  });
};
