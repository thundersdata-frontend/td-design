import React, { FC, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import WheelCurvedPicker from './WheelCurvedPicker';
import { Theme } from '../config/theme';
import { PickerProps, ItemValue, ModalPickerProps } from './type';
import Flex from '../flex';
import Text from '../text';
import { px } from '../helper';

const Picker: FC<PickerProps & ModalPickerProps> = (props) => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();
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
      <Modal animationType="slide" transparent statusBarTranslucent visible={visible}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
          edges={['top']}
        >
          <View style={{ backgroundColor: 'white', paddingBottom: insets.bottom }}>
            <Flex
              height={px(50)}
              borderBottomWidth={StyleSheet.hairlineWidth}
              borderBottomColor="borderColor"
            >
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
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
  return PickerComp;
};

export default Picker;
