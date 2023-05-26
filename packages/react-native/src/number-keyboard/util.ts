import { NumberKeyBoardType } from './type';

/**
 * 格式化输入的值
 * @param value 输入的值
 * @param type 类型
 * @param digit 小数位数
 * @returns
 */
export function formatValue(value: string, type?: NumberKeyBoardType, digit = 2) {
  if (!value || !type) return value;

  switch (type) {
    case 'idcard':
    default:
      return value;

    case 'integer':
      return +value;

    case 'number':
      return (+value).toFixed(digit);
  }
}
