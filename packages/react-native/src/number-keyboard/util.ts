import { NumberKeyBoardType } from './type';

/**
 * 格式化输入的值
 * @param value 输入的值
 * @param type 类型
 * @returns
 */
export function formatValue(value: string, type?: NumberKeyBoardType) {
  if (!value || !type) return value;

  switch (type) {
    case 'IdCard':
    default:
      return value;

    case 'integer':
    case 'number':
      return +value;
  }
}
