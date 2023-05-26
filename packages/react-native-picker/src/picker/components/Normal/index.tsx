import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Flex, helpers, Modal, Text } from '@td-design/react-native';

import WheelPicker from '../../../components/WheelPicker';
import { ModalPickerProps, PickerProps } from '../../type';
import useNormalPicker from './useNormalPicker';

const { ONE_PIXEL, px } = helpers;
const NormalPicker: FC<PickerProps & ModalPickerProps> = props => {
  const {
    title,
    displayType = 'modal',
    visible = false,
    onClose,
    data,
    value,
    onChange,
    cancelText = '取消',
    okText = '确定',
    activeOpacity = 0.5,
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
        <WheelPicker
          key={index}
          {...restProps}
          {...{ data: item, value: selectedValue ? selectedValue[index] : '' }}
          onChange={val => handleChange(val, index)}
        />
      ))}
    </Flex>
  );

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={handleClose} animationDuration={150}>
        <Flex
          height={px(50)}
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="border"
          backgroundColor="background"
          paddingHorizontal="x3"
        >
          <Flex.Item alignItems="flex-start">
            <TouchableOpacity activeOpacity={activeOpacity} onPress={handleClose} style={styles.cancel}>
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
            <TouchableOpacity activeOpacity={activeOpacity} onPress={handleOk} style={styles.submit}>
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

export default React.memo(NormalPicker);

const styles = StyleSheet.create({
  cancel: { width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start' },
  submit: { width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-end' },
});
