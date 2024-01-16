import React, { forwardRef, useImperativeHandle } from 'react';
import { Keyboard } from 'react-native';

import { useTheme } from '@shopify/restyle';

import { showVehicleKeyboard } from '.';
import Box from '../box';
import Brief from '../brief';
import Flex from '../flex';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { VehicleKeyboardItemProps, VehicleKeyboardRef } from './type';
import useVehicleKeyboard from './useVehicleKeyboard';

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
      activeOpacity = 0.6,
      inForm,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { currentText, handleSubmit, handleInputClear } = useVehicleKeyboard({
      value,
      onChange,
      onCheck,
      placeholder,
    });

    const show = () => {
      Keyboard.dismiss();
      if (disabled) return;
      showVehicleKeyboard({
        ...restProps,
        value: currentText === placeholder ? '' : currentText,
        onSubmit: handleSubmit,
        activeOpacity,
      });
    };

    useImperativeHandle(ref, () => {
      return {
        focus: show,
      };
    });

    return (
      <Box flexGrow={1} paddingHorizontal={inForm ? 'x0' : 'x1'} justifyContent={'center'} style={style}>
        <Flex>
          <Pressable
            activeOpacity={activeOpacity}
            onPress={show}
            style={[
              {
                flexGrow: 1,
                paddingVertical: theme.spacing.x2,
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              variant="p1"
              color={currentText === placeholder ? 'gray300' : 'text'}
              style={[{ textAlign: 'right' }, inputStyle]}
              selectable
            >
              {currentText}
            </Text>
          </Pressable>
          {allowClear && !disabled && !!currentText && currentText !== placeholder && (
            <Pressable activeOpacity={1} onPress={handleInputClear} hitOffset={10} style={{ alignItems: 'center' }}>
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </Pressable>
          )}
          <Brief brief={extra} />
        </Flex>
      </Box>
    );
  }
);
VehicleKeyboardItem.displayName = 'VehicleKeyboardItem';

export default VehicleKeyboardItem;
