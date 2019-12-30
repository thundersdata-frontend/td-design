import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';

const Router = DefaultRouter;

const routes = [
  {
    path: '/',
    component: props =>
      React.createElement(
        require('/Users/damon/Documents/thundersdata/frontend/td-design/packages/site/node_modules/umi-plugin-father-doc/lib/themes/default/layout.js')
          .default,
        {
          ...{
            menu: {
              items: [
                {
                  path: '/haha',
                  title: 'haha',
                  meta: {
                    title: 'haha',
                    order: 3,
                    slugs: [{ depth: 1, value: 'haha', heading: 'haha' }],
                  },
                },
                {
                  path: '/',
                  title: '介绍',
                  meta: { title: '介绍', order: 1, slugs: [] },
                },
                {
                  path: '/config',
                  title: '配置',
                  meta: {},
                  children: [
                    {
                      path: '/config/test',
                      title: '介绍 2',
                      meta: {
                        group: { path: '/config', title: '配置' },
                        title: '介绍 2',
                        order: 2,
                        slugs: [],
                      },
                    },
                    {
                      path: '/config/test2',
                      title: '介绍 3',
                      meta: {
                        group: { path: '/config', title: '配置' },
                        title: '介绍 3',
                        order: 2,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                  ],
                },
              ],
            },
            title: '雷数前端',
          },
          ...props,
        },
      ),
    routes: [
      {
        path: '/haha',
        component: require('../../docs/haha.md').default,
        exact: true,
        meta: {
          title: 'haha',
          order: 3,
          slugs: [
            {
              depth: 1,
              value: 'haha',
              heading: 'haha',
            },
          ],
        },
        title: 'haha',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - haha',
        _title_default: '雷数前端',
      },
      {
        path: '/',
        component: require('../../docs/index.md').default,
        exact: true,
        meta: {
          title: '介绍',
          order: 1,
          slugs: [],
        },
        title: '介绍',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - 介绍',
        _title_default: '雷数前端',
      },
      {
        path: '/config/test',
        component: require('../../docs/config/test.md').default,
        exact: true,
        meta: {
          group: {
            path: '/config',
            title: '配置',
          },
          title: '介绍 2',
          order: 2,
          slugs: [],
        },
        title: '介绍 2',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - 介绍 2',
        _title_default: '雷数前端',
      },
      {
        path: '/config/test2',
        component: require('../../docs/config/test2.md').default,
        exact: true,
        meta: {
          group: {
            path: '/config',
            title: '配置',
          },
          title: '介绍 3',
          order: 2,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: '介绍 3',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - 介绍 3',
        _title_default: '雷数前端',
      },
      {
        title: '配置',
        path: '/config',
        meta: {},
        exact: true,
        redirect: '/config/test',
        _title: '雷数前端 - 配置',
        _title_default: '雷数前端',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/damon/Documents/thundersdata/frontend/td-design/packages/site/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src', hasRoutesInConfig: false },
          ),
        _title: '雷数前端',
        _title_default: '雷数前端',
      },
    ],
    title: '雷数前端',
    _title: '雷数前端',
    _title_default: '雷数前端',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
