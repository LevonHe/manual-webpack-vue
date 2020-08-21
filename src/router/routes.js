import layoutHeaderAside from '@/layout/header-aside/index.vue';

// 懒加载页面
const _import = (file) => () => import(/* webpackChunkName: "[request]" */ '@/views/' + file);

const frameIn = [
  {
    path: '/',
    redirect: { name: 'map' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'map',
        name: 'map',
        meta: {
          title: 'menu.Map',
          auth: true,
        },
        component: _import('business/map'),
      },
      {
        path: 'tableEdit',
        name: 'tableEdit',
        meta: {
          title: 'menu.tableEdit',
          auth: true,
        },
        component: _import('business/tableEdit'),
      },
      {
        path: 'tableValid',
        name: 'tableValid',
        meta: {
          title: 'menu.tableValid',
          auth: true,
        },
        component: _import('business/tableValid'),
      },
      {
        path: 'cardList',
        name: 'cardList',
        meta: {
          title: 'menu.cardList',
          auth: true,
        },
        component: _import('business/cardList'),
      },
      {
        path: 'three',
        name: 'three',
        meta: {
          auth: true,
          title: 'menu.Three',
        },
        component: _import('business/three'),
      },
      {
        path: 'canvas',
        name: 'canvas',
        meta: {
          auth: true,
          title: 'menu.Canvas',
        },
        component: _import('business/canvas'),
      },
      // 刷新页面 必须保留 勿删
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh'),
      },
      // 页面重定向 必须保留 勿删
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect'),
      },
    ],
  },
];

const frameOut = [
  {
    path: '/login',
    name: 'login',
    component: _import('system/login'),
  },
];

const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404'),
  },
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage];
