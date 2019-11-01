/*
 * @文件描述: regex utils test
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-11-01 15:43:47
 * @LastEditors: 廖军
 * @LastEditTime: 2019-11-01 17:25:21
 */
import regexUtils from './index';
const { isPhone, isTelephone, isEmail, isNumber, containNumbers } = regexUtils;

describe('测试regexUtils', () => {
  it('isPhone-1: true', () => {
    expect(isPhone('13767302219')).toEqual(true);
  });

  it('isPhone-2: 不足11位数', () => {
    expect(isPhone('1376730221')).toEqual(false);
  });

  it('isPhone-3: 含不合法字符', () => {
    expect(isPhone('1376730221q')).toEqual(false);
  });

  it('isTelephone-1: true', () => {
    expect(isTelephone('0571-8888777')).toEqual(true);
  });

  it('isTelephone-2: 位数不对', () => {
    expect(isTelephone('0571-8888')).toEqual(false);
  });

  it('isTelephone-3: 含不合法字符', () => {
    expect(isTelephone('0571-8888777a')).toEqual(false);
  });

  it('isEmail-1: true', () => {
    expect(isEmail('33245677@qq.com')).toEqual(true);
  });

  it('isEmail-2: false', () => {
    expect(isEmail('33245677qq.com')).toEqual(false);
  });

  it('isNumber-1: true', () => {
    expect(isNumber('13')).toEqual(true);
  });

  it('isNumber-2: false', () => {
    expect(isNumber('13a')).toEqual(false);
  });

  it('containNumbers-1: true', () => {
    expect(containNumbers('as1s3s')).toEqual(true);
  });

  it('containNumbers-2: false', () => {
    expect(containNumbers('asddss')).toEqual(false);
  });
});
