import React, { forwardRef } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { VehicleKeyboardItemProps, VehicleKeyboardRef } from './type';
import useVehicleKeyboard from './useVehicleKeyboard';
import VehicleKeyboardModal from './VehicleKeyboardModal';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px } = helpers;
const VehicleKeyboardItem = forwardRef<VehicleKeyboardRef, VehicleKeyboardItemProps>(
  (
    {
      value,
      onChange,
      onCheck,
      placeholder = '请输入',
      disabled = false,
      style,
      inputStyle,
      extra,
      allowClear = true,
      minHeight = px(32),
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { visible, setTrue, setFalse, clearIconStyle, currentText, handleSubmit, handleInputClear } =
      useVehicleKeyboard({
        value,
        onChange,
        onCheck,
        placeholder,
        ref,
      });

    return (
      <Box width="100%">
        <Flex style={style}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Keyboard.dismiss();
              if (disabled) return;
              setTrue();
            }}
            style={[
              {
                flexGrow: 1,
                minHeight,
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              variant="d2"
              color={currentText === placeholder ? 'gray300' : 'text'}
              style={[{ textAlign: 'right' }, inputStyle]}
              selectable
            >
              {currentText}
            </Text>
          </TouchableOpacity>
          {allowClear && !disabled && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear}
              style={[{ width: 0, overflow: 'hidden', alignItems: 'center' }, clearIconStyle]}
            >
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
          {!!extra && <Box>{typeof extra === 'string' ? <Text>{extra}</Text> : extra}</Box>}
        </Flex>
        <VehicleKeyboardModal
          {...restProps}
          value={currentText === placeholder ? '' : currentText}
          visible={visible}
          onClose={setFalse}
          onSubmit={handleSubmit}
        />
      </Box>
    );
  }
);
VehicleKeyboardItem.displayName = 'VehicleKeyboardItem';

export default VehicleKeyboardItem;
