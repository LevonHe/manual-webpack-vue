let base = '';
let websocket = window.location.host;

if (process.env && process.env.NODE_ENV === 'development') {
  // base = 'http://172.28.2.105:80';
  // websocket = '172.28.2.105:80';
  base = 'http://127.0.0.1:3001/rest';
  websocket = '127.0.0.1:3001';
}

export const baseUrl = base;
export const websocketUrl = websocket;
