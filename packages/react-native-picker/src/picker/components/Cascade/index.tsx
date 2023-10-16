import React from 'react';
import { StyleSheet } from 'react-native';

import { Flex, helpers, Modal, Pressable, Text } from '@td-design/react-native';

import WheelPicker from '../../../components/WheelPicker';
import { CascadePickerItemProps } from '../../../components/WheelPicker/type';
import { CascaderProps } from '../../type';
import useCascader from './useCascader';

const { ONE_PIXEL } = helpers;

const Cascader = ({
  data,
  cols = 3,
  activeOpacity = 0.6,
  visible = false,
  displayType = 'modal',
  title,
  cancelText = '取消',
  okText = '确定',
  value,
  onClose,
  onChange,
}: CascaderProps) => {
  const { childrenTree, stateValue, handleOk, handleValueChange } = useCascader({
    data,
    cols,
    value,
    visible,
    onChange,
    onClose,
  });

  const PickerComp = (
    <Flex backgroundColor="white">
      {childrenTree.map((item: CascadePickerItemProps[] = [], level) => (
        <WheelPicker
          key={level}
          {...{ data: item.map(el => ({ ...el, value: `${el.value}` })), value: `${stateValue[level]}` }}
          onChange={val => handleValueChange(val, level)}
        />
      ))}
    </Flex>
  );

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={onClose} animationDuration={150}>
        <Flex
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="border"
          backgroundColor="white"
          paddingVertical="x3"
          paddingHorizontal="x3"
        >
          <Flex.Item alignItems="flex-start">
            <Pressable activeOpacity={activeOpacity} onPress={onClose} style={styles.cancel}>
              <Text variant="p0" color="primary200">
                {cancelText}
              </Text>
            </Pressable>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <Text variant="p0" color="text">
              {title}
            </Text>
          </Flex.Item>
          <Flex.Item alignItems="flex-end">
            <Pressable activeOpacity={activeOpacity} onPress={handleOk} style={styles.submit}>
              <Text variant="p0" color="primary200">
                {okText}
              </Text>
            </Pressable>
          </Flex.Item>
        </Flex>
        {PickerComp}
      </Modal>
    );
  }
  return PickerComp;
};

const styles = StyleSheet.create({
  cancel: { width: '100%', justifyContent: 'center', alignItems: 'flex-start' },
  submit: { width: '100%', justifyContent: 'center', alignItems: 'flex-end' },
});

export default React.memo(Cascader);
