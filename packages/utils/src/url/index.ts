import stringUtils from '../string/index';
import jsonUtils from '../json/index';

/**
 * 通过url或带后缀的文件名称获取文件类型
 */
const getFileType = (name: string = '') => name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();

const urlUtils = {
  getFileType,

  /**
   * 判断文件后缀是否是支持预览
   */
  isSupportPreview(name: string = '') {
    return /(ppt|pptx|xls|xlsx|xlsm|xlt|xltx|xltm|csv|doc|docx|docm|dot|dotx|dotm|pdf|jpg|jpeg|png|gif|bmp|txt)/.test(
      getFileType(name),
    );
  },

  /**
   * 判断url或文件名称是否是图片类型
   */
  isImg(name: string = '') {
    const fileType = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
    return /(png|jpg|jpeg|gif|bmp)/.test(fileType);
  },

  /**
   * 判断url或文件名称是否是pdf类型
   */
  isPdf(name: string = '') {
    const fileType = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
    return /(pdf)/.test(fileType);
  },

  /**
   * @功能描述: 获得url中的传参
   * @参数: name(指定项的key值)
   * @返回值: 若有name，则返回指定项的value，若没有name则返回一个query的json
   */
  getUrlQuery(name?: string) {
    let after = window.location.search || window.location.hash;
    after = after ? after.split('?')[1] : '';
    const query = {};
    const strs = after ? after.split('&') : [];
    for (let i = 0; i < strs.length; i++) {
      const keyValueMaps = strs[i] ? strs[i].split('=') : [];
      if (keyValueMaps.length === 2) {
        query[keyValueMaps[0]] = decodeURIComponent(keyValueMaps[1]);
      } else if (keyValueMaps[0]) {
        query[keyValueMaps[0]] = null;
      }
    }
    if (name && typeof name !== 'object') {
      return query[name];
    }
    return query;
  },

  /**
   * 用于将查询参数储存到url
   * @param params 查询参数
   */
  setUrlQuery(params: object) {
    const baseHref = window.location.href.split('?')[0];
    const queryStr = Object.keys(jsonUtils.removeEmpty(params))
      .map(key => `${key}=${stringUtils.valueToString(params[key])}`)
      .join('&');
    const newHref = `${baseHref}?${queryStr}`;
    window.location.href = newHref;
    return newHref;
  },
};

export default urlUtils;
