import Vue from 'vue';
import i18n from './i18n';
import App from './App.vue';
// UI组件
import ElementUI from 'element-ui';
// vuex
import store from './store/index.js';
// 自定义插件
import api from '@/api';
import modal from '@/plugin/modal';
import msg from '@/plugin/msg';
// 路由
import router from './router';
// 样式文件
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/index.less';
import './assets/styles/animate.css';

Vue.use(ElementUI);

// 自定义插件
Vue.use(api);
Vue.use(modal, { i18n, store });
Vue.use(msg);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
