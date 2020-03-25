import request from '@/plugin/axios/index';
// import { formatRequestParams } from '@/util/commonService';

// 登录
export const login = (data) =>
  request({
    url: '/api/v1/login',
    method: 'POST',
    data,
  });

// 根据用户id查询角色
export const getRoleById = (userId) =>
  request({
    url: `/api/v1/users/${userId}/roles`,
    method: 'GET',
  });
