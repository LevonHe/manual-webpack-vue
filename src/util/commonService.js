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
// 获取url参数
export const getUrlParam = (name) => {
  let url = location.href;
  let temp = url.split('?');
  let paramStr = temp[1];
  let param = paramStr.split('&');
  let obj = {};
  for (let i = 0; i < param.length; i += 1) {
    let item = param[i].split('=');
    let key = item[0];
    let value = item[1];
    obj[key] = value;
  }
  return obj[name];
};
// 获取页面横向滚动条未知
export const getPageScrollLeft = () => {
  return document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
};
// 获取页面纵向滚动条未知
export const getPageScrollTop = () => {
  return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
};
// 获取某个dom元素的offset和scroll距离
export const getRootOffsetAndScroll = (el, pname = 'body') => {
  // 对于要计算偏移和滚动长度的父元素，要设置相对定位
  let offsetLeft = el.offsetLeft;
  let offsetTop = el.offsetTop;
  let scrollLeft = el.scrollLeft;
  let scrollTop = el.scrollTop;
  if (el.offsetParent && el.offsetParent.tagName !== pname) {
    let p = getRootOffsetAndScroll(el.offsetParent, pname);
    offsetLeft += p[0];
    offsetTop += p[1];
    scrollLeft += p[2];
    scrollTop += p[3];
  }
  return [offsetLeft, offsetTop, scrollLeft, scrollTop];
};
// 开启全屏
export const launchFullScreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
};
// 关闭全屏
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};
// 返回顶部
export const scrollToTop = () => {
  const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
  if (top > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, top - top / 8);
  }
};

// 金额格式化，三位加逗号
export const formatMoney = (num) => {
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 截取字符串，加省略号
export const subText = (str, length) => {
  if (str.length === 0) {
    return '';
  }
  if (str.length > length) {
    return str.substr(0, length) + '...';
  } else {
    return str;
  }
};

// base64转file
export const base64ToFile = (base64, filename) => {
  let arr = base64.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split('/')[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime });
};
// base64转blob
export const base64ToBlob = (base64) => {
  let arr = base64.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

// blob转file
export const blobToFile = (blob, filename) => {
  blob.lastModifiedDate = new Date();
  blob.name = filename;
  return blob;
};

// file转base64
export const fileToBase64 = (file) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    return e.target.result;
  };
};

// pc or 移动设备
export const detectDeviceType = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'PC';
};

// 判断手机类型
export const getOSType = () => {
  let u = navigator.userAgent;
  // let app = navigator.appVersion;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    return 0;
  }
  if (isAndroid) {
    return 1;
  }
  return 2;
};

// 判断数据类型
export const type = (target) => {
  let ret = typeof target;
  let obj = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'number-object',
    '[object Boolean]': 'boolean-object',
    '[object String]': 'string-object',
  };

  if (target === null) {
    return 'null';
  } else if (ret === 'object') {
    let str = Object.prototype.toString.call(target);
    return obj[str];
  } else {
    return ret;
  }
};
// 生成指定范围随机数
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// 数组中某个元素的出现次数
export const eleOccurCount = (arr, el) => {
  return arr.reduce((a, v) => (v === el ? a + 1 : a + 0), 0);
};
// 去除空格
/**
 * @param {string} str
 * @param {number} type 1-所有空格 2-前后空格 3-前空格 4-后空格
 */
export const trim = (str, type = 1) => {
  if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) {
    return;
  }
  switch (type) {
    case 1:
      return str.replace(/\s/g, '');
    case 2:
      return str.replace(/(^\s)|(\s*$)/g, '');
    case 3:
      return str.replace(/(^\s)/g, '');
    case 4:
      return str.replace(/(\s$)/g, '');
    default:
      return str;
  }
};
// html转义
export const escapeHTML = (str) => {
  str.replace(
    /[&<>'"]/g,
    (tag) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
};
// 加
export const add = (num1, num2) => {
  let n1, n2, m;
  try {
    n1 = num1.toString().split('.')[1].length;
  } catch (error) {
    n1 = 0;
  }
  try {
    n2 = num2.toString().split('.')[1].length;
  } catch (error) {
    n2 = 0;
  }
  m = Math.pow(10, Math.max(n1, n2));
  return (num1 * m + num2 * m) / m;
};
// 减
export const sub = (num1, num2) => {
  let n1, n2, m, n;
  try {
    n1 = num1.toString().split('.')[1].length;
  } catch (error) {
    n1 = 0;
  }
  try {
    n2 = num2.toString().split('.')[1].length;
  } catch (error) {
    n2 = 0;
  }
  m = Math.pow(10, Math.max(n1, n2));
  n = n1 >= n2 ? n1 : n2;
  return Number(((num1 * m - num2 * m) / m).toFixed(n));
};
// 乘
export const multiplication = (num1, num2) => {
  let m = 0,
    n1 = num1.toString(),
    n2 = num2.toString();
  try {
    m += n1.split('.')[1].length;
  } catch (error) {}
  try {
    m += n2.split('.')[1].length;
  } catch (error) {}

  return (Number(n1.replace('.', '')) * Number(n2.replace('.', ''))) / Math.pow(10, m);
};
// 除
export const division = (num1, num2) => {
  let r1, r2, n1, n2;
  try {
    n1 = num1.toString().split('.')[1].length;
  } catch (error) {
    n1 = 0;
  }
  try {
    n2 = num2.toString().split('.')[1].length;
  } catch (error) {
    n2 = 0;
  }
  r1 = Number(num1.toString().replace('.', ''));
  r2 = Number(num2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, n2 - n1);
};
