import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Flex, Text, Modal, helpers } from '@td-design/react-native';
import WheelPicker from '../WheelPicker';
import { PickerProps, ModalPickerProps } from '../../type';
import useNormalPicker from './useNormalPicker';

const { ONE_PIXEL, px } = helpers;
const NormalPicker: FC<PickerProps & ModalPickerProps> = props => {
  const {
    title,
    displayType = 'modal',
    visible = false,
    onClose,
    data,
    style,
    value,
    onChange,
    cancelText = '取消',
    okText = '确定',
    ...restProps
  } = props;

  const { pickerData, selectedValue, handleChange, handleOk, handleClose } = useNormalPicker({
    data,
    value,
    onChange,
    onClose,
    visible,
    displayType,
  });

  const PickerComp = (
    <Flex backgroundColor="background">
      {pickerData.map((item, index) => (
        <Flex.Item key={index}>
          <WheelPicker
            {...restProps}
            {...{ data: item, value: selectedValue ? selectedValue[index] : '' }}
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
        <Flex
          height={px(50)}
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="border"
          backgroundColor="background"
          paddingHorizontal="x3"
        >
          <Flex.Item alignItems="flex-start">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleClose}
              style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}
            >
              <Text variant="p0" color="primary200">
                {cancelText}
              </Text>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <Text variant="p0" color="gray500">
              {title}
            </Text>
          </Flex.Item>
          <Flex.Item alignItems="flex-end">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleOk}
              style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
            >
              <Text variant="p0" color="primary200">
                {okText}
              </Text>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        {PickerComp}
      </Modal>
    );
  }
  return PickerComp;
};

export default NormalPicker;
