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
import NumberKeyboardModal from './NumberKeyboardModal';
import { NumberKeyboardInputProps, NumberKeyboardRef } from './type';
import useNumberKeyboard from './useNumberKeyboard';

const { px, ONE_PIXEL } = helpers;
const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const NumberKeyboardInput = forwardRef<NumberKeyboardRef, NumberKeyboardInputProps>(
  (
    {
      label,
      value,
      onChange,
      placeholder = '请输入',
      type,
      style,
      inputStyle,
      allowClear = true,
      digit = 0,
      minHeight = px(32),
      brief,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { visible, setTrue, setFalse, clearIconStyle, currentText, handleSubmit, handleInputClear } =
      useNumberKeyboard({
        value,
        onChange,
        digit,
        type,
        placeholder,
        ref,
      });

    return (
      <Box>
        <Flex marginRight="x2" marginBottom="x1" alignItems="center">
          <Text variant="p1" color="gray500">
            {label}
          </Text>
        </Flex>
        <Flex paddingHorizontal="x1" borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1" style={style}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Keyboard.dismiss();
              setTrue();
            }}
            style={[
              {
                flex: 1,
                minHeight,
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              variant="d2"
              color={currentText === placeholder ? 'gray300' : 'text'}
              paddingLeft="x1"
              style={[{ textAlign: 'right' }, inputStyle]}
              selectable
            >
              {currentText}
            </Text>
          </TouchableOpacity>
          {allowClear && (
            <AnimatedTouchableIcon
              activeOpacity={0.5}
              onPress={handleInputClear}
              style={[{ width: 0, overflow: 'hidden', alignItems: 'center' }, clearIconStyle]}
            >
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
        </Flex>
        {brief && (
          <Box marginBottom="x1">
            {typeof brief === 'string' ? (
              <Text variant="p2" color="gray300">
                {brief}
              </Text>
            ) : (
              brief
            )}
          </Box>
        )}
        <NumberKeyboardModal
          {...restProps}
          type={type}
          value={currentText === placeholder ? '' : currentText}
          visible={visible}
          onClose={setFalse}
          onSubmit={handleSubmit}
        />
      </Box>
    );
  }
);
NumberKeyboardInput.displayName = 'NumberKeyboardInput';

export default NumberKeyboardInput;
