/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-11-11 13:57:32
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-11 14:53:29
 */
import { advanceTo } from 'jest-date-mock';

import dateUtils from './index';
const { formatDate } = dateUtils;

describe('测试日期工具函数', () => {
  beforeAll(() => {
    advanceTo(new Date(2019, 11, 11, 14, 44, 10));
  });

  it('默认为当前时间，格式默认', () => {
    expect(formatDate(new Date())).toEqual('2019-12-11');
  });

  it('默认为当前时间，格式为YYYY年MM月DD日', () => {
    expect(formatDate(new Date(), 'YYYY年MM月DD日')).toEqual('2019年12月11日');
  });

  it('指定时间戳，格式默认', () => {
    expect(formatDate(1573454973000)).toEqual('2019-11-11');
  });

  it('指定时间戳，格式为YYYY年MM月DD日', () => {
    expect(formatDate(1573454973000, 'YYYY年MM月DD日')).toEqual('2019年11月11日');
  });
});
