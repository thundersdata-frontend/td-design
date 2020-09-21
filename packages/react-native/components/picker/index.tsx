import React, { FC, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { StyleSheet, TouchableOpacity } from 'react-native';
import WheelCurvedPicker from './WheelCurvedPicker';
import { Theme } from '../config/theme';
import { PickerProps, ItemValue, ModalPickerProps } from './type';
import Flex from '../flex';
import Text from '../text';
import Modal from '../modal';
import { px } from '../helper';

const Picker: FC<PickerProps & ModalPickerProps> = props => {
  const theme = useTheme<Theme>();
  const [selectedValue, selectValue] = useState(props.value);

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
    value,
    onChange,
    ...restProps
  } = props;

  const handleChange = (val?: ItemValue) => {
    selectValue(val);
    if (displayType === 'view' && onChange) {
      onChange(val);
    }
  };

  const handleClose = () => {
    selectValue(value);
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
    <WheelCurvedPicker
      {...restProps}
      {...{ data, selectedValue, textColor, textSize, itemSpace }}
      onValueChange={handleChange}
      style={[{ height: px(220) }, style]}
    />
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

export default Picker;
