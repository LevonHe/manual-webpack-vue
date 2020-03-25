const files = require.context('./modules', true, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default {
  namespaced: true,
  modules,
};
