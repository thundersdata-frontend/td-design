import arrayUtils from './array';
import jsonUtils from './json';
import regexUtils from './regex';
import stringUtils from './string';
import urlUtils from './url';
import authUtils from './auth';
import RAFUtils from './raf';
import requestUtils from './request';

export const array = arrayUtils;
export const json = jsonUtils;
export const regex = regexUtils;
export const string = stringUtils;
export const url = urlUtils;
export const auth = authUtils;
export const RAF = RAFUtils;
export const request = requestUtils;

const tdUtils = {
  array,
  json,
  regex,
  string,
  url,
  auth,
  RAF,
  request,
};

export default tdUtils;
