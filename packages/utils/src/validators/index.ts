/*
 * @文件描述: 
 * @公司: thundersdata
 * @作者: 瞿超超
 * @Date: 2019-10-29 16:17:00
 * @LastEditors: 瞿超超
 * @LastEditTime: 2019-10-30 19:33:06
 */
import reg from '../regex/index';

/**
 * 手机号码校验
 * @param _rule
 * @param value
 * @param callback
 */
export function phoneValidator(_rule: any, value: string, callback: any) {
  if (value && !reg.isPhone(value)) {
    callback('请输入有效的电话号码');
  } else {
    callback();
  }
}