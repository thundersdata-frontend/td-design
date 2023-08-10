import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Flex, helpers, Modal, Text } from '@td-design/react-native';

import WheelPicker from '../../../components/WheelPicker';
import { CascadePickerItemProps } from '../../../components/WheelPicker/type';
import { CascaderProps } from '../../type';
import useCascader from './useCascader';

const { px, ONE_PIXEL } = helpers;

const Cascader = ({
  data,
  cols = 3,
  activeOpacity = 0.5,
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

  const Cols = childrenTree.map((item: CascadePickerItemProps[] = [], level) => (
    <WheelPicker
      key={level}
      {...{ data: item.map(el => ({ ...el, value: `${el.value}` })), value: `${stateValue[level]}` }}
      onChange={val => handleValueChange(val, level)}
    />
  ));

  const PickerComp = <Flex backgroundColor="background">{Cols}</Flex>;

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={onClose} animationDuration={150}>
        <Flex
          height={px(50)}
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="border"
          backgroundColor="background"
          paddingHorizontal="x3"
        >
          <Flex.Item alignItems="flex-start">
            <TouchableOpacity activeOpacity={activeOpacity} onPress={onClose} style={styles.cancel}>
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

const styles = StyleSheet.create({
  cancel: { width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-start' },
  submit: { width: '100%', flex: 1, justifyContent: 'center', alignItems: 'flex-end' },
});

export default React.memo(Cascader);
