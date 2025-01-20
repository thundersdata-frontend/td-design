import React, { forwardRef, useImperativeHandle } from 'react';
import { Keyboard } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Brief from '../brief';
import Flex from '../flex';
import helpers from '../helpers';
import Label from '../label';
import Modal from '../modal';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { VehicleKeyboardInputProps, VehicleKeyboardRef } from './type';
import useVehicleKeyboard from './useVehicleKeyboard';
import VehicleKeyboardModal from './VehicleKeyboardModal';

const { ONE_PIXEL } = helpers;
const VehicleKeyboardInput = forwardRef<VehicleKeyboardRef, VehicleKeyboardInputProps>(
  (
    {
      label,
      labelPosition = 'left',
      colon = false,
      required = false,
      value,
      onChange,
      onCheck,
      placeholder = '请输入',
      disabled = false,
      type,
      extra,
      style,
      inputStyle,
      allowClear = true,
      brief,
      itemHeight,
      activeOpacity = 0.6,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { currentText, handleSubmit, handleInputClear } = useVehicleKeyboard({
      value,
      onCheck,
      onChange,
      placeholder,
    });

    const show = () => {
      Keyboard.dismiss();
      Modal.show(
        <VehicleKeyboardModal
          {...{
            ...restProps,
            type,
            value: currentText === placeholder ? '' : currentText,
            onSubmit: handleSubmit,
            activeOpacity,
          }}
        />,
        { position: 'bottom' }
      );
    };

    useImperativeHandle(ref, () => {
      return {
        focus: show,
      };
    });

    const InputContent = (
      <Flex paddingHorizontal="x1" borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1" flex={1}>
        <Pressable
          activeOpacity={activeOpacity}
          onPress={show}
          style={[
            itemHeight ? { height: itemHeight, justifyContent: 'center' } : {},
            {
              flex: 1,
              paddingVertical: theme.spacing.x2,
            },
            style,
          ]}
        >
          <Text variant="p1" color={currentText === placeholder ? 'gray300' : 'text'} style={inputStyle} selectable>
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
    );

    if (labelPosition === 'top')
      return (
        <Box>
          <Label {...{ label, colon, required }} />
          {InputContent}
          <Brief brief={brief} />
        </Box>
      );

    return (
      <Box>
        <Flex alignItems="center">
          <Label {...{ colon, label, required }} />
          {InputContent}
        </Flex>
        <Brief brief={brief} />
      </Box>
    );
  }
);
VehicleKeyboardInput.displayName = 'VehicleKeyboardInput';

export default VehicleKeyboardInput;
