/**
 * @param {*} params: 请求参数对象
 */
export const formatParams = (params) => {
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

/**
 * @param {*} num: 数字
 * @param {*} n: 保留位数
 */
export const getFloat = (num, n) => {
  let result = parseFloat(num);
  if (isNaN(result)) {
    return '';
  }
  const total = n ? parseInt(n, 10) : 0;
  if (total <= 0) {
    return Math.round(result) + '';
  }
  result = Math.round(result * Math.pow(10, n)) / Math.pow(10, n);
  let sX = result.toString();
  let posDecimal = sX.indexOf('.'); // 小数点的索引值
  // 整数
  if (posDecimal < 0) {
    posDecimal = sX.length;
    sX += '.';
  }
  // 当数字的长度小于小数点索引加n时，补0
  while (sX.length <= posDecimal + total) {
    sX += '0';
  }
  return sX + '';
};
// uuid
export const getUUID = () => {
  const s = [];
  const hexDigits = '01234567890abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1);
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';

  const uuid = s.join('');
  return uuid;
};

// 解码JWTtoken
/**
 * @param {*} token: 需要被解码的token
 */
export const decodeToken = (token) => {
  if (!token) {
    return {};
  }
  if (token.indexOf('.') === -1) {
    return {};
  }
  const objStr = decodeURIComponent(escape(window.atob(token.split('.')[1])));
  const newStr = objStr
    .replace(/"subjectId":(\d+)/, '"subjectId":"$1"')
    .replace(/"organizationId":(\d+)/, '"organizationId":"$1"')
    .replace(/"tenantId":(\d+)/, '"tenantId":"$1"');
  return JSON.parse(newStr);
};

// getBrowserType
function getVersion(versionStr) {
  const versionArr = versionStr.split('.');
  let version;
  if (versionArr.length === 1) {
    version = versionArr[0];
  } else if (versionArr.length > 1) {
    version = versionArr[0] + '.' + versionArr[1];
  }
  return parseFloat(version);
}
export const getBrowserType = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Firefox') > -1) {
    const versionStr = userAgent.split('Firefox/')[1].split(' ')[0];
    const version = getVersion(versionStr);
    return { type: 'Firefox', version };
  }
  if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Edge') > -1) {
    const versionStr = userAgent.split('Edge/')[1].split(' ')[0];
    const version = getVersion(versionStr);
    return { type: 'Edge', version };
  }
  if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1) {
    const versionStr = userAgent.split('Chrome/')[1].split(' ')[0];
    const version = getVersion(versionStr);
    return { type: 'Chrome', version };
  }
  if (userAgent.indexOf('Trident') > -1 && userAgent.indexOf('compatible') > -1) {
    if (userAgent.indexOf('MSIE 10.0') > -1) {
      return { type: 'IE', version: 10.0 };
    }
    if (userAgent.indexOf('MSIE 9.0') > -1) {
      return { type: 'IE', version: 9.0 };
    }
  }
  if (userAgent.indexOf('Trident') > -1) {
    return { type: 'IE', version: 11.0 };
  }

  return { type: 'none', version: 0 };
};

/**
 * @description 异步加载高德地图
 */
export function loadMP() {
  const mp = new Promise((resolve, reject) => {
    const hasLoaded = document.getElementById('amap');
    if (hasLoaded) {
      resolve(AMap);
      return;
    }
    window.init = function init() {
      resolve(AMap);
    };
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=afab6449e9193d57d031a489545a7b9a&callback=init';
    script.id = 'amap';
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return mp;
}

// 数据类型判断
export function toRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

// 浅拷贝
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
export function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => looseEqual(e, b[i]));
      }
      if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every((key) => looseEqual(a[key], b[key]));
      }
      return false;
    } catch (error) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
