export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        component: './homepage',
      },
      {
        path: '*',
        component: './404',
      },
    ],
  },
];
