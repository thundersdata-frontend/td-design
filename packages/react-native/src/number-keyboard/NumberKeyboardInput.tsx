import React, { FC } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import Text from '../text';
import helpers from '../helpers';
import NumberKeyboardModal from './NumberKeyboardModal';
import { Theme } from '../theme';
import Flex from '../flex';
import Box from '../box';
import { NumberKeyboardInputProps } from './type';
import SvgIcon from '../svg-icon';
import useNumberKeyboard from './useNumberKeyboard';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px } = helpers;
const NumberKeyboardInput: FC<NumberKeyboardInputProps> = ({
  value,
  onChange,
  placeholder = '请输入',
  disabled = false,
  type,
  style,
  allowClear = true,
  digit = 2,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const { visible, toggle, clearIconStyle, currentText, handleSubmit, handleInputClear } = useNumberKeyboard({
    value,
    onChange,
    digit,
    type,
    placeholder,
  });

  return (
    <Box>
      <Flex>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Keyboard.dismiss();
            if (disabled) return;
            toggle();
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
          <Text variant="p1" color={currentText === placeholder ? 'gray300' : 'text'}>
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
      </Flex>
      <NumberKeyboardModal
        {...restProps}
        type={type}
        value={currentText === placeholder ? '' : currentText}
        visible={visible}
        onClose={toggle}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default NumberKeyboardInput;
