import stringUtils from './index';
const { fillZero, textEllipsis, getLastSubstring, valueToString } = stringUtils;

describe('测试stringUtils', () => {
  it('fillZero-1: 小于10的情况自动补充0', () => {
    expect(fillZero(9)).toEqual('09');
  });

  it('fillZero-2： 大于或等于10的情况直接返回', () => {
    expect(fillZero(10)).toEqual(10);
  });

  it('textEllipsis-1： 截取长度等于0直接返回', () => {
    expect(textEllipsis('12345', 0)).toEqual('12345');
  });

  it('textEllipsis-2： 截取长度大于实际长度直接返回', () => {
    expect(textEllipsis('12345', 6)).toEqual('12345');
  });

  it('textEllipsis-3： 截取长度等于实际长度直接返回', () => {
    expect(textEllipsis('12345', 6)).toEqual('12345');
  });

  it('textEllipsis-4： 截取长度小于实际长度，进行截取并添加...', () => {
    expect(textEllipsis('12345', 3)).toEqual('123...');
  });

  it('getLastSubstring-1： 正常匹配', () => {
    expect(getLastSubstring('www.test.com', '.')).toEqual('com');
  });

  it('getLastSubstring-2： 匹配标记为空是返回为空', () => {
    expect(getLastSubstring('www.test.com', '')).toEqual('');
  });

  it('valueToString-1： 字符串直接返回', () => {
    expect(valueToString('123')).toEqual('123');
  });

  it('valueToString-2： 数字格式化', () => {
    expect(valueToString(123)).toEqual('123');
  });

  it('valueToString-3： 对象格式化', () => {
    expect(valueToString({ value: 123 })).toEqual('{"value":123}');
  });

  it('valueToString-4： 数组格式化', () => {
    expect(valueToString([123])).toEqual('[123]');
  });
});
