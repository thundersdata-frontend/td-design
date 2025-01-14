import React from 'react';
import { StyleSheet } from 'react-native';

import { Flex, helpers, Pressable, Text } from '@td-design/react-native';
import { ImperativeModalChildrenProps } from '@td-design/react-native/lib/typescript/modal/type';

import WheelPicker from '../../../components/WheelPicker';
import { CascadePickerItemProps } from '../../../components/WheelPicker/type';
import { CascaderProps } from '../../type';
import useCascader from './useCascader';

const { ONE_PIXEL } = helpers;

function Cascader<T>({
  data,
  cols = 3,
  activeOpacity = 0.6,
  title,
  cancelText = '取消',
  okText = '确定',
  value,
  onChange,
  closeModal,
  ...restProps
}: ImperativeModalChildrenProps<CascaderProps<T>>) {
  const { childrenTree, stateValue, handleValueChange, handleOk, handleClose } = useCascader({
    data,
    cols,
    value,
    onChange,
    closeModal,
  });

  if (childrenTree.length === 0) return null;

  return (
    <>
      <Flex
        borderBottomWidth={ONE_PIXEL}
        borderBottomColor="border"
        backgroundColor="white"
        paddingVertical="x3"
        paddingHorizontal="x3"
      >
        <Pressable activeOpacity={activeOpacity} onPress={handleClose} style={styles.cancel}>
          <Text variant="p0" color="primary200">
            {cancelText}
          </Text>
        </Pressable>
        <Flex.Item alignItems="center">
          <Text variant="p0" color="text">
            {title}
          </Text>
        </Flex.Item>
        <Pressable activeOpacity={activeOpacity} onPress={handleOk} style={styles.submit}>
          <Text variant="p0" color="primary200">
            {okText}
          </Text>
        </Pressable>
      </Flex>
      <Flex>
        {childrenTree.map((item: CascadePickerItemProps<T>[] = [], index) => (
          <WheelPicker
            key={index}
            {...restProps}
            {...{ data: item.map(el => ({ ...el, value: el.value })), value: stateValue[index] }}
            onChange={value => handleValueChange(value, index)}
          />
        ))}
      </Flex>
    </>
  );
}

const styles = StyleSheet.create({
  cancel: { justifyContent: 'center', alignItems: 'flex-start' },
  submit: { justifyContent: 'center', alignItems: 'flex-end' },
});

export default Cascader;
