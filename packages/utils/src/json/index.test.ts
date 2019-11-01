/*
 * @文件描述: json utils test
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-11-01 15:32:00
 * @LastEditors: 廖军
 * @LastEditTime: 2019-11-01 15:41:27
 */
import jsonUtils from './index';
const { reverseObj, removeEmpty } = jsonUtils;

describe('测试jsonUtils', () => {
  it('reverseObj-1: 可以成功反转key value', () => {
    expect(reverseObj({ 1: 'red' }).red).toEqual('1');
  });

  it('removeEmpty-1: 可以移除空字符串', () => {
    expect(JSON.stringify(removeEmpty({ id: '' }))).toEqual('{}');
  });

  it('removeEmpty-2: 可以移除null', () => {
    expect(JSON.stringify(removeEmpty({ id: null }))).toEqual('{}');
  });

  it('removeEmpty-2: 可以移除undefined', () => {
    expect(JSON.stringify(removeEmpty({ id: undefined }))).toEqual('{}');
  });
});
