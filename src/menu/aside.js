export default [
  {
    path: '/map',
    title: 'menu.Map',
    icon: 'el-icon-map-location',
  },
  {
    path: null,
    title: 'menu.Table',
    icon: 'el-icon-s-custom',
    children: [
      {
        path: '/tableEdit',
        title: 'menu.TableEdit',
        icon: null,
      },
      {
        path: '/tableValid',
        title: 'menu.TableValid',
        icon: null,
      },
      {
        path: '/cardList',
        title: 'menu.CardList',
        icon: null,
      },
    ],
  },
  {
    path: '/three',
    title: 'menu.Three',
    icon: 'el-icon-menu',
  },
  {
    path: '/canvas',
    title: 'menu.Canvas',
    icon: 'el-icon-picture-outline-round',
  },
];
