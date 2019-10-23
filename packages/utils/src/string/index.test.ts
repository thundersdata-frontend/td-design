import stringUtils from './index';
const { fillZero } = stringUtils;

describe('测试stringUtils', () => {
  it('fillZero-1: 小于10的情况自动补充0', () => {
    expect(fillZero(9)).toEqual('09');
  });

  it('fillZero-2： 大于或等于10的情况直接返回', () => {
    expect(fillZero(10)).toEqual(10);
  });
});
