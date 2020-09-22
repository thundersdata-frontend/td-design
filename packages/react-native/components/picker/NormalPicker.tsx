import React, { FC } from 'react';
import { useTheme } from '@shopify/restyle';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useImmer } from 'use-immer';
import { isArray } from 'lodash-es';
import WheelCurvedPicker from './WheelCurvedPicker';
import { Theme } from '../config/theme';
import { PickerProps, ItemValue, ModalPickerProps, CascadePickerItemProps } from './type';
import Flex from '../flex';
import Text from '../text';
import Modal from '../modal';
import { px } from '../helper';

const NormalPicker: FC<PickerProps & ModalPickerProps> = props => {
  const theme = useTheme<Theme>();
  const {
    title,
    displayType = 'modal',
    visible,
    onClose,
    textColor = theme.colors.primaryTextColor,
    textSize = px(20),
    itemSpace = px(32),
    data,
    style,
    value = [],
    onChange,
    ...restProps
  } = props;
  const { pickerData, initialValue } = transform(data);
  const [selectedValue, selectValue] = useImmer(!value || value.length === 0 ? initialValue : value);

  const handleChange = (val: ItemValue, index: number) => {
    selectValue(draft => {
      draft[index] = val;
      if (displayType === 'view' && onChange) {
        onChange(draft);
      }
    });
  };

  const handleClose = () => {
    selectValue(draft => {
      draft.length = 0;
      draft = value;
    });
    if (onClose) {
      onClose();
    }
  };

  const handleOk = () => {
    if (onChange) {
      onChange(selectedValue);
    }
    if (onClose) {
      onClose();
    }
  };

  const PickerComp = (
    <Flex>
      {pickerData.map((item, index) => (
        <Flex.Item key={index}>
          <WheelCurvedPicker
            {...restProps}
            {...{ data: item, value: selectedValue[index], textColor, textSize, itemSpace }}
            onChange={val => handleChange(val, index)}
            style={[{ height: px(220) }, style]}
          />
        </Flex.Item>
      ))}
    </Flex>
  );

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={handleClose}>
        <Flex height={px(50)} borderBottomWidth={StyleSheet.hairlineWidth} borderBottomColor="borderColor">
          <Flex.Item alignItems="center">
            <TouchableOpacity onPress={handleClose}>
              <Text variant="primaryTipReverse">取消</Text>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <Text variant="primaryBody">{title}</Text>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <TouchableOpacity onPress={handleOk}>
              <Text variant="primaryTipReverse">确定</Text>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        {PickerComp}
      </Modal>
    );
  }
  return PickerComp;
};

/**
 * 将data格式统一成二维数组
 * @param data
 */
function transform(data: CascadePickerItemProps[] | Array<CascadePickerItemProps[]>) {
  const item = data[0];
  if (!isArray(item)) {
    return {
      pickerData: [data as CascadePickerItemProps[]],
      initialValue: [item.value],
    };
  }
  return {
    pickerData: data as Array<CascadePickerItemProps[]>,
    initialValue: (data as Array<CascadePickerItemProps[]>).map(ele => ele[0].value),
  };
}

export default NormalPicker;
