import Vue from 'vue';
import VueRouter from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import CookieService from '@/util/CookieService';

import routes from './routes';

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch((err) => err);
};

const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some((r) => r.meta.auth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
    const token = CookieService.getCookie('Business-Token');
    if (token && token !== 'undefined') {
      next();
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath,
        },
      });
      NProgress.done();
    }
  } else {
    // 不需要身份校验 直接通过
    next();
  }
});

router.afterEach((to) => {
  // 进度条
  NProgress.done();
});

export default router;
