/*
 * @文件描述: array utils test
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-11-01 15:03:29
 * @LastEditors: 廖军
 * @LastEditTime: 2019-11-01 15:31:23
 */
import arrayUtils from './index';
const { deepFlatten, deepOrder } = arrayUtils;

const testData = [
  {
    label: 'ces1',
    orderValue: 1,
    children: [
      { label: 'ces1-1', orderValue: 1 },
      { label: 'ces1-2', orderValue: 0 },
    ],
  },
  { label: 'ces2', orderValue: 0 },
];

describe('测试arrayUtils', () => {
  it('deepFlatten-1: 数组展平后的length符合预期', () => {
    expect(deepFlatten(testData).length).toEqual(4);
  });

  it('deepOrder-1: 递归排序后的顺序符合预期', () => {
    expect(
      deepOrder({ data: testData, childKey: 'children', orderKey: 'orderValue', type: 'asc' })[1].children![0].label,
    ).toEqual('ces1-2');
  });
});
