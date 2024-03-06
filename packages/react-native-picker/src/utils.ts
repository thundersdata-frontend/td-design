import { CascadePickerItemProps, ItemValue } from './components/WheelPicker/type';

/**
 * 根据value，返回对应的label
 * @param data 数据
 * @param value 选中的值
 * @param cascade 是否级联
 * @returns 值对应的文本
 */
export function transformValueToLabel(
  data: CascadePickerItemProps[] | Array<CascadePickerItemProps[]>,
  value?: ItemValue[],
  cascade?: boolean,
  hyphen?: string
) {
  if (!value || value.length === 0) return undefined;
  if (!cascade) {
    if (Array.isArray(data[0])) {
      let text = '';
      value.forEach((val, index) => {
        const label = (data[index] as CascadePickerItemProps[]).find(item => item.value + '' === val + '')?.label;
        if (label) {
          text += label + hyphen;
        }
      });
      return text.substring(0, text.length - 1);
    }
    return (data as CascadePickerItemProps[]).find(item => item.value + '' === value[0] + '')?.label;
  }
  return value.map(val => findByValue(data as CascadePickerItemProps[], val)?.label).join(hyphen);
}

/**
 * 根据value从一个级联数组中查找节点
 * @param data
 * @param value
 * @returns
 */
function findByValue(data: CascadePickerItemProps[], value: ItemValue): CascadePickerItemProps | undefined {
  let selectedItem: CascadePickerItemProps | undefined = undefined;

  function recurision(list: CascadePickerItemProps[], value: ItemValue) {
    if (!list) return;
    for (let i = 0; i < list.length; i++) {
      if (list[i].value + '' === value + '') {
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
