type valueType = object | number | string;

export default {
  /**
   * 为小于10的数字在前面补零。如9补零后为09
   * @param val
   */
  fillZero(val: number | string) {
    if (+val === NaN || val >= 10) {
      return val;
    } else {
      return `0${val}`;
    }
  },

  /**
   * 用于字符长度超过指定个数自动截取并添加...
   */
  textEllipsis(text: string, length: number) {
    if (text.length > length && length > 0) {
      return `${text.substring(0, length)}...`;
    }
    return text;
  },

  /**
   * 获取指定分隔符点后面的最后字符串
   * @param (sourceStr splitStr) 源字符串 裁剪字符节点
   * @returns {string} 最后一个裁剪字符后面的字符串
   */
  getLastSubstring(sourceStr: string = '', splitStr: string = '') {
    return sourceStr.substring(sourceStr.lastIndexOf(splitStr) + splitStr.length, sourceStr.length);
  },

  /**
   * 值格式化为string
   * @param value
   */
  valueToString(value: valueType | valueType[]) {
    if (typeof value === 'string') {
      return value;
    }
    return JSON.stringify(value);
  },
};
