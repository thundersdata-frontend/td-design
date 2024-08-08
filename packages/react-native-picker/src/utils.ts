import { CascadePickerItemProps } from './components/WheelPicker/type';

/**
 * 根据value，返回对应的label
 * @param data 数据
 * @param value 选中的值
 * @param cascade 是否级联
 * @returns 值对应的文本
 */
export function transformValueToLabel<T>(
  data: CascadePickerItemProps<T>[],
  value?: T[] | T,
  cascade?: boolean,
  hyphen?: string
) {
  if (!value) return undefined;

  if (!cascade) {
    return data.find(item => item.value === value)?.label;
  }

  return (value as T[]).map(val => findByValue(data, val)?.label).join(hyphen);
}

/**
 * 根据value从一个级联数组中查找节点
 * @param data
 * @param value
 * @returns
 */
function findByValue<T>(data: CascadePickerItemProps<T>[], value: T): CascadePickerItemProps<T> | undefined {
  let selectedItem: CascadePickerItemProps<T> | undefined = undefined;

  function recurision(list: CascadePickerItemProps<T>[], value: T) {
    if (!list) return;
    for (let i = 0; i < list.length; i++) {
      if (list[i].value === value) {
        selectedItem = list[i];
        break;
      }
      if (list[i].children) {
        recurision(list[i].children!, value);
      }
    }
  }

  recurision(data, value);

  return selectedItem;
}
