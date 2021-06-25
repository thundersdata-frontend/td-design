import React, { FC, useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, helpers } from '@td-design/react-native';

import Picker from '../picker';
import { CascadePickerItemProps, ModalPickerProps, PickerProps, ItemValue } from '../picker/type';

interface PickerItemProps extends PickerProps, Omit<ModalPickerProps, 'visible'> {
  placeholder?: string;
}

const { px } = helpers;
const PickerItem: FC<PickerItemProps> = ({ placeholder = '请选择', cascade, value, data, onChange, ...restProps }) => {
  const [currentText, setCurrentText] = useState(placeholder);
  const [visible, setVisible] = useState(false);

  const handleChange = useCallback(
    (value?: ItemValue[]) => {
      const label = transformValueToLabel(data, value, cascade);
      setCurrentText(label ?? placeholder);
      onChange?.(value);
    },
    [cascade, data, onChange, placeholder]
  );

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
        style={{ flex: 1, minHeight: px(32), justifyContent: 'center', alignItems: 'flex-end' }}
      >
        <Text variant="p1" color="gray300">
          {currentText}
        </Text>
      </TouchableOpacity>
      <Picker {...restProps} {...{ cascade, value, data, visible, onChange: handleChange, onClose: handleClose }} />
    </>
  );
};

export default PickerItem;

/**
 * 根据value，返回对应的label
 * @param data 数据
 * @param value 选中的值
 * @param cascade 是否级联
 * @returns 值对应的文本
 */
function transformValueToLabel(
  data: CascadePickerItemProps[] | Array<CascadePickerItemProps[]>,
  value?: ItemValue[],
  cascade?: boolean
) {
  if (!value || value.length === 0) return undefined;
  if (!cascade) {
    if (Array.isArray(data[0])) {
      let text = '';
      value.forEach((val, index) => {
        const label = (data[index] as CascadePickerItemProps[]).find(item => item.value === val)?.label;
        if (label) {
          text += label + ',';
        }
      });
      return text.substring(0, text.length - 1);
    }
    return (data as CascadePickerItemProps[]).find(item => item.value === value[0])?.label;
  }
  return value.map(val => findByValue(data as CascadePickerItemProps[], val)?.label).join(',');
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
