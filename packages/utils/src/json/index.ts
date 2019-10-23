const jsonUtils = {
  /**
   * 反转object的key和value
   * @param obj
   */
  reverseObj(obj: { [x: string]: string | number }) {
    const reversedObj: { [x: string]: string | number } = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      reversedObj[value] = key;
    });
    return reversedObj;
  },

  /**
   * 对搜索条件进行无效参数过滤
   * @param params
   */
  removeEmpty(params: object) {
    const newParams = {};
    Object.keys(params).forEach(key => {
      if (!['', null, undefined].includes(params[key])) {
        newParams[key] = params[key];
      }
    });
    return newParams;
  },

  /**
   * 获取指定分隔符点后面的最后字符串
   * @param (sourceStr splitStr) 源字符串 裁剪字符节点
   * @returns {string} 最后一个裁剪字符后面的字符串
   */
  getLastSubstring(sourceStr: string = '', splitStr: string = '') {
    return sourceStr.substring(sourceStr.lastIndexOf(splitStr) + splitStr.length, sourceStr.length);
  },
};

export default jsonUtils;
