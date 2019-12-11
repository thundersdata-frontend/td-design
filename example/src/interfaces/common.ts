/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-23 21:12:06
 * @LastEditors: 廖军
 * @LastEditTime: 2019-12-10 16:00:52
 */

export interface CustomWindow extends Window {
  gMenus: MenuItemConfig[];
  requestConfig: {
    withCredentials: boolean;
    getToken: () => Promise<string>;
  };
  authConfig: {
    url: string;
    client_id: string;
    client_secret: string;
    password_min: number;
    password_max: number;
    company: number;
  };
}

export interface CustomLocation extends Location {
  query: {
    [x: string]: string;
  };
}

export interface PageMatchModel {
  isExact: boolean;
  params: object;
  path: string;
  url: string;
}

export interface PageBasicPropsModel {
  history: History;
  location: CustomLocation;
  match: PageMatchModel;
}

export interface MenuItemConfig {
  name: string;
  link?: string;
  icon?: string;
  children?: MenuItemConfig[];
}

export interface PrivilegeResource {
  apiUrl: string;
  description: string;
  icon: string;
  id: number;
  orderValue: number;
  resourceKey: string;
  type: number;
  privilegeList: string[];
  resourceBusinessValue: string;
  children: PrivilegeResource[];
}
