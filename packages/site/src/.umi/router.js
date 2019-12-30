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
                  path: '/',
                  title: '介绍',
                  meta: {
                    title: '介绍',
                    order: 10,
                    slugs: [
                      { depth: 1, value: '文档库组成', heading: '文档库组成' },
                      {
                        depth: 1,
                        value: '如何参与和贡献',
                        heading: '如何参与和贡献',
                      },
                      {
                        depth: 1,
                        value: '文档库维护人员',
                        heading: '文档库维护人员',
                      },
                    ],
                  },
                },
                {
                  path: '/web',
                  title: 'Web组件库',
                  meta: {},
                  children: [
                    {
                      path: '/web',
                      title: '介绍',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: '介绍',
                        order: 51,
                        slugs: [
                          {
                            depth: 1,
                            value: 'Web 组件库介绍',
                            heading: 'web-组件库介绍',
                          },
                          {
                            depth: 1,
                            value: 'Web 组件库使用',
                            heading: 'web-组件库使用',
                          },
                          { depth: 2, value: '安装', heading: '安装' },
                          { depth: 2, value: '配置', heading: '配置' },
                          { depth: 2, value: '使用', heading: '使用' },
                          { depth: 2, value: '效果', heading: '效果' },
                          {
                            depth: 1,
                            value: '项目常用配置说明',
                            heading: '项目常用配置说明',
                          },
                          {
                            depth: 2,
                            value: '使用 iconfont.cn',
                            heading: '使用-iconfontcn',
                          },
                          {
                            depth: 2,
                            value: '其他待补充',
                            heading: '其他待补充',
                          },
                        ],
                      },
                    },
                    {
                      path: '/web/action-button',
                      title: 'ActionButtons 操作按钮组',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'ActionButtons 操作按钮组',
                        order: 50,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/card',
                      title: 'Card 卡片',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'Card 卡片',
                        order: 49,
                        slugs: [],
                      },
                    },
                    {
                      path: '/web/container',
                      title: 'Container 容器',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'Container 容器',
                        order: 48,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/filter-form',
                      title: 'FilterForm 筛选表单',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'FilterForm 筛选表单',
                        order: 47,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/form-creator',
                      title: 'FormCreator 表单生成',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'FormCreator 表单生成',
                        order: 46,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/form-table',
                      title: 'FormTable 表格表单项',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'FormTable 表格表单项',
                        order: 45,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/list',
                      title: 'List 列表',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'List 列表',
                        order: 44,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/login-form',
                      title: 'LoginForm 登录表单',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'LoginForm 登录表单',
                        order: 43,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/process-node',
                      title: 'ProcessNode 流程节点',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'ProcessNode 流程节点',
                        order: 42,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/range-picker',
                      title: 'RangePicker 日期区间选择器',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'RangePicker 日期区间选择器',
                        order: 41,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/register-form',
                      title: 'RegisterForm 注册表单',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'RegisterForm 注册表单',
                        order: 40,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/reset-form',
                      title: 'ResetForm 重置表单',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'ResetForm 重置表单',
                        order: 39,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/result',
                      title: 'Result 结果页',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'Result 结果页',
                        order: 38,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/rich-editor',
                      title: 'RichEditor 富文本编辑器',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'RichEditor 富文本编辑器',
                        order: 37,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/sms-form',
                      title: 'SMSForm 验证码登录表单',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'SMSForm 验证码登录表单',
                        order: 36,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/sms-input',
                      title: 'SMSInput 验证码输入',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'SMSInput 验证码输入',
                        order: 35,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/table',
                      title: 'Table 表格',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'Table 表格',
                        order: 34,
                        slugs: [{ depth: 1, value: 'test', heading: 'test' }],
                      },
                    },
                    {
                      path: '/web/tip',
                      title: 'Tip 提示',
                      meta: {
                        group: { path: '/web', title: 'Web组件库' },
                        title: 'Tip 提示',
                        order: 33,
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
        path: '/',
        component: require('../../docs/index.md').default,
        exact: true,
        meta: {
          title: '介绍',
          order: 10,
          slugs: [
            {
              depth: 1,
              value: '文档库组成',
              heading: '文档库组成',
            },
            {
              depth: 1,
              value: '如何参与和贡献',
              heading: '如何参与和贡献',
            },
            {
              depth: 1,
              value: '文档库维护人员',
              heading: '文档库维护人员',
            },
          ],
        },
        title: '介绍',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - 介绍',
        _title_default: '雷数前端',
      },
      {
        path: '/web/action-button',
        component: require('../../docs/web/action-button.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'ActionButtons 操作按钮组',
          order: 50,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'ActionButtons 操作按钮组',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - ActionButtons 操作按钮组',
        _title_default: '雷数前端',
      },
      {
        path: '/web/card',
        component: require('../../docs/web/card.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'Card 卡片',
          order: 49,
          slugs: [],
        },
        title: 'Card 卡片',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - Card 卡片',
        _title_default: '雷数前端',
      },
      {
        path: '/web/container',
        component: require('../../docs/web/container.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'Container 容器',
          order: 48,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'Container 容器',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - Container 容器',
        _title_default: '雷数前端',
      },
      {
        path: '/web/filter-form',
        component: require('../../docs/web/filter-form.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'FilterForm 筛选表单',
          order: 47,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'FilterForm 筛选表单',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - FilterForm 筛选表单',
        _title_default: '雷数前端',
      },
      {
        path: '/web/form-creator',
        component: require('../../docs/web/form-creator.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'FormCreator 表单生成',
          order: 46,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'FormCreator 表单生成',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - FormCreator 表单生成',
        _title_default: '雷数前端',
      },
      {
        path: '/web/form-table',
        component: require('../../docs/web/form-table.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'FormTable 表格表单项',
          order: 45,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'FormTable 表格表单项',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - FormTable 表格表单项',
        _title_default: '雷数前端',
      },
      {
        path: '/web',
        component: require('../../docs/web/index.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: '介绍',
          order: 51,
          slugs: [
            {
              depth: 1,
              value: 'Web 组件库介绍',
              heading: 'web-组件库介绍',
            },
            {
              depth: 1,
              value: 'Web 组件库使用',
              heading: 'web-组件库使用',
            },
            {
              depth: 2,
              value: '安装',
              heading: '安装',
            },
            {
              depth: 2,
              value: '配置',
              heading: '配置',
            },
            {
              depth: 2,
              value: '使用',
              heading: '使用',
            },
            {
              depth: 2,
              value: '效果',
              heading: '效果',
            },
            {
              depth: 1,
              value: '项目常用配置说明',
              heading: '项目常用配置说明',
            },
            {
              depth: 2,
              value: '使用 iconfont.cn',
              heading: '使用-iconfontcn',
            },
            {
              depth: 2,
              value: '其他待补充',
              heading: '其他待补充',
            },
          ],
        },
        title: '介绍',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - 介绍',
        _title_default: '雷数前端',
      },
      {
        path: '/web/list',
        component: require('../../docs/web/list.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'List 列表',
          order: 44,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'List 列表',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - List 列表',
        _title_default: '雷数前端',
      },
      {
        path: '/web/login-form',
        component: require('../../docs/web/login-form.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'LoginForm 登录表单',
          order: 43,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'LoginForm 登录表单',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - LoginForm 登录表单',
        _title_default: '雷数前端',
      },
      {
        path: '/web/process-node',
        component: require('../../docs/web/process-node.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'ProcessNode 流程节点',
          order: 42,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'ProcessNode 流程节点',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - ProcessNode 流程节点',
        _title_default: '雷数前端',
      },
      {
        path: '/web/range-picker',
        component: require('../../docs/web/range-picker.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'RangePicker 日期区间选择器',
          order: 41,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'RangePicker 日期区间选择器',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - RangePicker 日期区间选择器',
        _title_default: '雷数前端',
      },
      {
        path: '/web/register-form',
        component: require('../../docs/web/register-form.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'RegisterForm 注册表单',
          order: 40,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'RegisterForm 注册表单',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - RegisterForm 注册表单',
        _title_default: '雷数前端',
      },
      {
        path: '/web/reset-form',
        component: require('../../docs/web/reset-form.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'ResetForm 重置表单',
          order: 39,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'ResetForm 重置表单',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - ResetForm 重置表单',
        _title_default: '雷数前端',
      },
      {
        path: '/web/result',
        component: require('../../docs/web/result.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'Result 结果页',
          order: 38,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'Result 结果页',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - Result 结果页',
        _title_default: '雷数前端',
      },
      {
        path: '/web/rich-editor',
        component: require('../../docs/web/rich-editor.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'RichEditor 富文本编辑器',
          order: 37,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'RichEditor 富文本编辑器',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - RichEditor 富文本编辑器',
        _title_default: '雷数前端',
      },
      {
        path: '/web/sms-form',
        component: require('../../docs/web/sms-form.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'SMSForm 验证码登录表单',
          order: 36,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'SMSForm 验证码登录表单',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - SMSForm 验证码登录表单',
        _title_default: '雷数前端',
      },
      {
        path: '/web/sms-input',
        component: require('../../docs/web/sms-input.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'SMSInput 验证码输入',
          order: 35,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'SMSInput 验证码输入',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - SMSInput 验证码输入',
        _title_default: '雷数前端',
      },
      {
        path: '/web/table',
        component: require('../../docs/web/table.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'Table 表格',
          order: 34,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'Table 表格',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - Table 表格',
        _title_default: '雷数前端',
      },
      {
        path: '/web/tip',
        component: require('../../docs/web/tip.md').default,
        exact: true,
        meta: {
          group: {
            path: '/web',
            title: 'Web组件库',
          },
          title: 'Tip 提示',
          order: 33,
          slugs: [
            {
              depth: 1,
              value: 'test',
              heading: 'test',
            },
          ],
        },
        title: 'Tip 提示',
        Routes: [require('./TitleWrapper.jsx').default],
        _title: '雷数前端 - Tip 提示',
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
