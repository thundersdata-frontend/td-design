/*
 * @文件描述: 运行时配置，可以在项目运行过程中执行一些操作。
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-25 13:43:18
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-27 19:36:00
 */
import utils from '@td-design/utils';
import request from '@td-design/utils/lib/request';
import { isEmpty } from 'lodash';
import { PrivilegeResource, MenuItemConfig, CustomWindow } from './interfaces/common';

interface Route {
  path: string;
  component?: string;
  routes?: Route[];
}

let serverRoutes: Route[] = [];
/**
 * 在路由改变时做一些事情，比如埋点。
 * 系统初次加载时也会执行，但action为undefined
 * @param param0
 */
// export function onRouteChange({
//   location,
//   routes,
//   action,
// }: {
//   location: Location;
//   routes: Route[];
//   action: string;
// }) {
//   console.log(location, routes, action);
// }

/**
 * 运行时修改路由配置。和render配合使用，请求服务端根据相应动态更新路由。
 * @param routes
 */
export function patchRoutes(oldRoutes: Route[]) {
  oldRoutes.forEach(route => {
    if (route.path === '/') {
      serverRoutes.forEach(sr => {
        if (route.routes) {
          route.routes.splice(1, 0, sr);
        }
      });
    }
  });
}

/**
 * 改写整个应用render到dom树里。
 * 可能场景：
 *  1. 在渲染应用之前做权限校验，不通过则跳转到登录页（单点登录场景会很有用）
 *  2. 和pathRoutes配合，在render时请求后端接口，拿到动态路由
 * @param oldRender
 */
export async function render(oldRender: Function) {
  const result = await request.get<PrivilegeResource[]>('/resource');
  const { code, success, data = [] } = result;
  if (code === 20000 && success) {
    const routes = utils.array.deepOrder({
      data,
      childKey: 'children',
      orderKey: 'orderValue',
      type: 'asc',
    });
    const privileges: string[] = [];
    const flatRoutes = utils.array.deepFlatten(routes);
    flatRoutes.forEach(route => {
      privileges.push(...route.privilegeList);
    });

    // 将menus保存为应用的菜单、将privileges保存为应用的细粒度权限
    serverRoutes = convertResourceToRoute(routes);
    const menus = convertResourceToMenu(routes);
    ((window as unknown) as CustomWindow).gMenus = menus;
  }
  oldRender();
}

/**
 * 将后台返回的权限资源，转换成应用的菜单
 * @param resources
 */
function convertResourceToMenu(list: PrivilegeResource[]): MenuItemConfig[] {
  return list.map(item => {
    if (!isEmpty(item.children)) {
      return {
        link: item.apiUrl,
        name: item.description,
        icon: item.icon,
        children: convertResourceToMenu(item.children),
      };
    }
    return {
      link: item.apiUrl,
      name: item.description,
      icon: item.icon,
    };
  });
}

/**
 * 将后台返回的权限资源，转换成应用的路由配置
 * @param list
 */
function convertResourceToRoute(list: PrivilegeResource[]): Route[] {
  return list.map(item => {
    if (!isEmpty(item.children)) {
      return {
        path: item.apiUrl,
        routes: convertResourceToRoute(item.children),
      };
    }
    return {
      path: item.apiUrl,
      component: require('./pages' + item.apiUrl).default,
    };
  });
}
