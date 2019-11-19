/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-27 17:34:01
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-27 17:43:40
 */
import { MenuItemConfig } from './common';

export interface BaseStore {
  menus: MenuItemConfig[];
  privileges: string[];

  setMenus: (menus: MenuItemConfig[]) => void;
  setPrivileges: (privileges: string[]) => void;
}
