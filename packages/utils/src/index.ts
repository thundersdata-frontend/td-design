import arrayUtils from './array';
import jsonUtils from './json';
import regexUtils from './regex';
import stringUtils from './string';
import urlUtils from './url';
import authUtils from './auth';
import RAF from './raf';

const tdUtils = {
  array: arrayUtils,
  json: jsonUtils,
  regex: regexUtils,
  string: stringUtils,
  url: urlUtils,
  auth: authUtils,
  RAF,
};

export default tdUtils;
