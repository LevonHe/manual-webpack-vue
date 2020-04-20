import request from '@/plugin/axios/index';

// 查询位置列表
export const getGeoList = () =>
  request({
    url: `/api/v1/geoList`,
    method: 'GET',
  });
