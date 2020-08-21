import system from './system';

const files = require.context('./modules', true, /index\.js$/);
const modules = {};
files.keys().forEach((key) => {
  Object.assign(modules, files(key).default);
});

const api = {
  ...modules,
  ...system,
  install(Vue) {
    Vue.prototype.$api = api;
  },
};

export default api;
