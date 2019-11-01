/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-25 10:14:57
 * @LastEditors: 廖军
 * @LastEditTime: 2019-11-01 17:45:00
 */
import stringUtils from '../string/index';
import jsonUtils from '../json/index';

/**
 * 通过url或带后缀的文件名称获取文件类型
 */
const getFileType = (name = '') => name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();

const urlUtils = {
  getFileType,

  /**
   * 判断文件后缀是否是支持预览
   */
  isSupportPreview(name = '') {
    return /(ppt|pptx|xls|xlsx|xlsm|xlt|xltx|xltm|csv|doc|docx|docm|dot|dotx|dotm|pdf|jpg|jpeg|png|gif|bmp|txt)/.test(
      getFileType(name),
    );
  },

  /**
   * 判断url或文件名称是否是图片类型
   */
  isImg(name = '') {
    const fileType = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
    return /(png|jpg|jpeg|gif|bmp)/.test(fileType);
  },

  /**
   * 判断url或文件名称是否是pdf类型
   */
  isPdf(name = '') {
    const fileType = name.substring(name.lastIndexOf('.') + 1, name.length).toLowerCase();
    return /(pdf)/.test(fileType);
  },

  /**
   * @功能描述: 获得url中的传参
   * @参数: name(指定项的key值)
   * @返回值: 若有name，则返回指定项的value，若没有name则返回一个query的json
   */
  getUrlQuery(name?: string) {
    const params = getParams();
    const query = {};
    params.forEach(param => {
      const keyValueMaps = param ? param.split('=') : [];
      if (keyValueMaps.length === 2) {
        query[keyValueMaps[0]] = decodeURIComponent(keyValueMaps[1]);
      }
    });
    return name ? query[name] : query;
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

  /**
   * @功能描述:  根据文件内容和文件名 创建下载任务
   * @参数: fileName(string) 文件名 content(string)文件内容
   * @返回值:
   */
  createDownloadTask(fileName: string, content: string) {
    const aTag = document.createElement('a');
    const blob = new Blob([content]);
    aTag.download = fileName;
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
    URL.revokeObjectURL(aTag.href);
  },
};

function getParams() {
  let after = window.location.search || window.location.hash;
  after = after ? after.split('?')[1] : '';
  const params = after ? after.split('&') : [];
  return params;
}

export default urlUtils;
