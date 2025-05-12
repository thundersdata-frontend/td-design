import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Flex, helpers, Pressable, Text } from '@td-design/react-native';

import WheelPicker from '../components/WheelPicker';
import { NormalPickerProps, PickerRef } from '../type';
import useNormalPicker from './useNormalPicker';

const { ONE_PIXEL, px } = helpers;
function NormalPicker(props: NormalPickerProps, ref: React.ForwardedRef<PickerRef>) {
  const {
    title,
    data,
    value,
    onChange,
    cancelText = '取消',
    okText = '确定',
    activeOpacity = 0.6,
    ...restProps
  } = props;

  const { bottom } = useSafeAreaInsets();

  const initialValue = data.length > 0 ? data[0].value : undefined;

  const { selectedValue, handleOk, handleChange, handleClose, visible } = useNormalPicker({
    value,
    initialValue,
    onChange,
    ref,
  });

  if (data.length === 0) return null;

  return (
    <Modal visible={visible} statusBarTranslucent animationType="none" transparent>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Box flex={1} justifyContent={'flex-end'} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Flex
            height={px(50)}
            borderBottomWidth={ONE_PIXEL}
            borderBottomColor="border"
            backgroundColor="white"
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
          <Box height={px(200)} backgroundColor="white" style={{ paddingBottom: bottom }}>
            <WheelPicker {...restProps} data={data} value={selectedValue} onChange={handleChange} />
          </Box>
        </Box>
      </GestureHandlerRootView>
    </Modal>
  );
}

export default React.forwardRef(NormalPicker);

const styles = StyleSheet.create({
  cancel: { justifyContent: 'center', alignItems: 'flex-start' },
  submit: { justifyContent: 'center', alignItems: 'flex-end' },
});
