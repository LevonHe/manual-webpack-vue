// 过滤请求参数
export const formatRequestParams = (params) => {
  if (!params) {
    return {};
  }
  Object.keys(params).forEach((k) => {
    if (!params[k]) {
      delete params[k];
    }
  });
  return params;
};
