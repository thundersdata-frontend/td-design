import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, Flex, helpers, Pressable, Text } from '@td-design/react-native';
import { ImperativeModalChildrenProps } from '@td-design/react-native/lib/typescript/modal/type';

import WheelPicker from '../../../components/WheelPicker';
import { NormalPickerProps } from '../../type';
import useNormalPicker from './useNormalPicker';

const { ONE_PIXEL, px } = helpers;
function NormalPicker<T>(props: ImperativeModalChildrenProps<NormalPickerProps<T>>) {
  const {
    title,
    data,
    value,
    onChange,
    cancelText = '取消',
    okText = '确定',
    activeOpacity = 0.6,
    closeModal,
    ...restProps
  } = props;

  const initialValue = data.length > 0 ? data[0].value : undefined;

  const { selectedValue, handleOk, handleChange, handleClose } = useNormalPicker({
    value,
    initialValue,
    onChange,
    closeModal,
  });

  if (data.length === 0) return null;

  return (
    <>
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
      <Box height={px(200)}>
        <WheelPicker {...restProps} data={data} value={selectedValue} onChange={handleChange} />
      </Box>
    </>
  );
}

export default NormalPicker;

const styles = StyleSheet.create({
  cancel: { justifyContent: 'center', alignItems: 'flex-start' },
  submit: { justifyContent: 'center', alignItems: 'flex-end' },
});
