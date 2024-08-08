import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Box, Flex, helpers, Modal, Pressable, Text } from '@td-design/react-native';

import WheelPicker from '../../../components/WheelPicker';
import { NormalPickerProps } from '../../type';
import useNormalPicker from './useNormalPicker';

const { ONE_PIXEL, px } = helpers;
function NormalPicker<T>(props: NormalPickerProps<T>) {
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
    activeOpacity = 0.6,
    ...restProps
  } = props;

  const initialValue = data.length > 0 ? data[0].value : undefined;

  const { selectedValue, handleChange, handleOk, handleClose } = useNormalPicker({
    value,
    initialValue,
    onChange,
    onClose,
    visible,
    displayType,
  });

  const PickerComp = useMemo(() => {
    if (!visible) return null;
    if (data.length === 0) return null;

    return (
      <Box height={px(200)}>
        <WheelPicker {...restProps} data={data} value={selectedValue} onChange={handleChange} />
      </Box>
    );
  }, [visible, data, selectedValue, restProps]);

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={handleClose} animationDuration={0}>
        {
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
        }
        {PickerComp}
      </Modal>
    );
  }
  return PickerComp;
}

export default NormalPicker;

const styles = StyleSheet.create({
  cancel: { justifyContent: 'center', alignItems: 'flex-start' },
  submit: { justifyContent: 'center', alignItems: 'flex-end' },
});
