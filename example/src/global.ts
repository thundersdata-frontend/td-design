import { CustomWindow } from "./interfaces/base";

/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-11-18 16:56:05
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-18 18:00:35
 */
((window as unknown) as CustomWindow).requestConfig = {
  withCredentials: false,
  getToken() {
    return Promise.resolve('123');
  },
};
((window as unknown) as CustomWindow).authConfig = {
  url: '',
  client_id: '',
  client_secret: '',
  password_min: 6,
  password_max: 20,
};
