/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-31 16:45:24
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2019-12-05 18:30:26
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
    company: number;
  };
}

import dateUtils from './date';
import arrayUtils from './array';
import jsonUtils from './json';
import regexUtils from './regex';
import stringUtils from './string';
import urlUtils from './url';
import authUtils from './auth';
import RAFUtils from './raf';
import requestUtils from './request';
import validators from './validators';

export const date = dateUtils;
export const array = arrayUtils;
export const json = jsonUtils;
export const regex = regexUtils;
export const string = stringUtils;
export const url = urlUtils;
export const auth = authUtils;
export const RAF = RAFUtils;
export const request = requestUtils;
export const validation = validators;

const tdUtils = {
  date,
  array,
  json,
  regex,
  string,
  url,
  auth,
  RAF,
  request,
  validation,
};

export default tdUtils;
