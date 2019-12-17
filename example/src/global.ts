/*
 * @文件描述: 此文件会在入口文件的最前面被自动引入，可以在这里加载补丁，做一些初始化操作。
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-25 13:43:43
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2019-12-17 11:07:30
 */
import * as Sentry from '@sentry/browser';
import sentryConfig from '../sentry.config';
import { CustomWindow } from './interfaces/common';
import lscache from 'lscache';

((window as unknown) as CustomWindow).requestConfig = {
  withCredentials: false,
  getToken() {
    return Promise.resolve(lscache.get('access_token'));
  },
};
((window as unknown) as CustomWindow).authConfig = {
  url: '',
  client_id: '',
  client_secret: '',
  password_min: 6,
  password_max: 20,
  company: 0,
};

Sentry.init({
  dsn: sentryConfig.dsn,
  release: sentryConfig.config.release,
});
