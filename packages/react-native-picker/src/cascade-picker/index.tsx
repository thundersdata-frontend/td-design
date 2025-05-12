import React, { ForwardedRef } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Flex, helpers, Pressable, Text } from '@td-design/react-native';

import WheelPicker from '../components/WheelPicker';
import { CascaderProps, PickerRef } from '../type';
import useCascader from './useCascader';

const { ONE_PIXEL, px } = helpers;

function Cascader(
  {
    data,
    cols = 3,
    activeOpacity = 0.6,
    title,
    cancelText = '取消',
    okText = '确定',
    value,
    onChange,
    ...restProps
  }: CascaderProps,
  ref: ForwardedRef<PickerRef>
) {
  const { childrenTree, stateValue, handleValueChange, handleOk, handleClose, visible } = useCascader({
    data,
    cols,
    value,
    onChange,
    ref,
  });

  const { bottom } = useSafeAreaInsets();

  if (childrenTree.length === 0) return null;

  return (
    <Modal visible={visible} statusBarTranslucent animationType="none" transparent>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Box flex={1} justifyContent={'flex-end'} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
          <Flex backgroundColor={'white'} height={px(200)} style={{ paddingBottom: bottom }}>
            {childrenTree.map((item, index) => (
              <WheelPicker
                key={index}
                {...restProps}
                {...{ data: item.map(el => ({ ...el, value: el.value })), value: stateValue[index] }}
                onChange={value => handleValueChange(value, index)}
              />
            ))}
          </Flex>
        </Box>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cancel: { justifyContent: 'center', alignItems: 'flex-start' },
  submit: { justifyContent: 'center', alignItems: 'flex-end' },
});

export default React.forwardRef(Cascader);
