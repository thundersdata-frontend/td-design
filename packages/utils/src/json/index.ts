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
};

export default jsonUtils;
