import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/layout/layout';
import PageNotFound from './views/pageNotFound/pageNotFound';
import Overview from './views/overview/overview';
import CookieService from './util/CookieService';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'overview' },
      component: Layout,
      children: [
        {
          path: 'overview',
          name: 'overview',
          meta: {
            auth: true,
          },
          component: Overview,
        },
        {
          path: 'tableEdit',
          name: 'tableEdit',
          meta: {
            title: 'menu.tableEdit',
            auth: true,
          },
          component: () => import(/* webpackChunkName: "tableEdit" */ './views/tableEdit'),
        },
        {
          path: 'tableValid',
          name: 'tableValid',
          meta: {
            title: 'menu.tableValid',
            auth: true,
          },
          component: () => import(/* webpackChunkName: "tableValid" */ './views/tableValid'),
        },
        {
          path: 'map',
          name: 'map',
          meta: {
            title: 'menu.Map',
            auth: true,
          },
          component: () => import(/* webpackChunkName: "map" */ './views/map'),
        },
        {
          path: 'chart',
          name: 'chart',
          meta: {
            auth: true,
            title: 'menu.Chart',
          },
          component: () => import(/* webpackChunkName: "chart" */ './views/chart'),
        },
        {
          path: 'three',
          name: 'three',
          meta: {
            auth: true,
            title: 'menu.Three',
          },
          component: () => import(/* webpackChunkName: "three" */ './views/three'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login/login.vue'),
    },
    {
      path: '*',
      name: '404',
      component: PageNotFound,
    },
  ],
});

router.beforeEach(function(to, from, next) {
  if (to.path === '/login' || CookieService.getCookie('_token')) {
    next();
  } else {
    next({ path: '/login' });
  }
});

export default router;
