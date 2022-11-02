import { useTheme } from '@shopify/restyle';
import React, { forwardRef } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import NumberKeyboardModal from './NumberKeyboardModal';
import Tooltips from './tooltips';
import { NumberKeyboardInputProps, NumberKeyboardRef } from './type';
import useNumberKeyboard from './useNumberKeyboard';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px } = helpers;
const NumberKeyboardInput = forwardRef<NumberKeyboardRef, NumberKeyboardInputProps>(
  (
    {
      value,
      onChange,
      placeholder = '请输入',
      disabled = false,
      type,
      style,
      allowClear = true,
      digit = 0,
      selectable = false,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { visible, setTrue, setFalse, clearIconStyle, currentText, tooltipRef, handleSubmit, handleInputClear } =
      useNumberKeyboard({
        value,
        onChange,
        digit,
        type,
        placeholder,
        ref,
      });

    return (
      <Box width="100%">
        <Flex>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Keyboard.dismiss();
              if (disabled) return;
              setTrue();
            }}
            onLongPress={() => {
              selectable && tooltipRef?.current?.show();
            }}
            style={[
              {
                flexGrow: 1,
                height: px(40),
                justifyContent: 'center',
                alignItems: 'flex-end',
              },
              style,
            ]}
          >
            <Tooltips value={currentText} onChange={handleSubmit} ref={tooltipRef} type={type}>
              <Text variant="d2" color={currentText === placeholder ? 'gray300' : 'text'}>
                {currentText}
              </Text>
            </Tooltips>
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
        </Flex>
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

export default NumberKeyboardInput;
