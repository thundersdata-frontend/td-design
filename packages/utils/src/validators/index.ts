/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 瞿超超
 * @Date: 2019-10-29 16:17:00
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-01 10:53:39
 */
import reg from '../regex/index';

/**
 * 手机号码校验
 * @param _rule
 * @param value
 * @param callback
 */
export function phoneValidator(_: unknown, value: string, callback: (message?: string) => void) {
  if (value && !reg.isPhone(value)) {
    callback('请输入有效的电话号码');
  } else {
    callback();
  }
}
