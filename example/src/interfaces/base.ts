/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-11-18 18:00:16
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-18 18:00:24
 */
export interface CustomWindow extends Window {
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
  };
}
