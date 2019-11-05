/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 瞿超超
 * @Date: 2019-10-29 16:17:00
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2019-11-04 10:47:04
 */
import reg from '../regex/index';

export default {
  /**
   * 手机号码校验
   * @param _rule
   * @param value
   * @param callback
   */
  phoneValidator(_: unknown, value: string, callback: (message?: string) => void) {
    if (value && !reg.isPhone(value)) {
      callback('请输入有效的电话号码');
    } else {
      callback();
    }
  },
};
