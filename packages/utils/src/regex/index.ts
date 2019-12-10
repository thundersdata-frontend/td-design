/*
 * @文件描述: 各种正则校验规则
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-25 10:14:57
 * @LastEditors: 廖军
 * @LastEditTime: 2019-12-10 15:30:41
 */
export default {
  /**
   * 检验是否是手机号
   */
  isPhone: function(value: string): boolean {
    const reg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/;
    return reg.test(value);
  },

  /**
   * 检验是否是座机
   */
  isTelephone: function(value: string): boolean {
    const reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    return reg.test(value);
  },

  /**
   * 检验是否是邮箱
   */
  isEmail: function(value: string): boolean {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(value);
  },

  /**
   * 检验是否是数字
   */
  isNumber: function(value: string): boolean {
    const reg = /(^([0-9]{1,})(.[0-9]+)?)$/;
    return reg.test(value);
  },

  /**
   * 检验是否是省
   * @param value
   */
  isProvince: function(value: string): boolean {
    const reg = /^\d{2}[0]{4}/;
    return reg.test(value);
  },

  /**
   * 检验是否是市
   * @param value
   */
  isCity: function(value: string): boolean {
    const reg = /^\d{4}[0]{2}/;
    return reg.test(value);
  },

  /* 校验是否包含数字 */
  containNumbers: function(param: string): boolean {
    const reg = /\d/;
    return reg.test(param);
  },
};
