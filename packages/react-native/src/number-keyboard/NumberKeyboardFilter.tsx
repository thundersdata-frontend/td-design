import React, { FC } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import Text from '../text';
import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import NumberKeyboardModal from './NumberKeyboardModal';
import { Theme } from '../theme';
import { NumberKeyboardFilterProps } from './type';
import SvgIcon from '../svg-icon';
import useNumberKeyboard from './useNumberKeyboard';

const { px, ONE_PIXEL } = helpers;
const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const NumberKeyboardFilter: FC<NumberKeyboardFilterProps> = ({
  label,
  value,
  onChange,
  placeholder = '请输入',
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
      <Flex marginRight="x2" marginBottom="x1" alignItems="center">
        <Text variant="p0" color="gray500">
          {label}
        </Text>
      </Flex>
      <Flex borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1">
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Keyboard.dismiss();
            toggle();
          }}
          style={[
            {
              flex: 1,
              height: px(40),
              justifyContent: 'center',
            },
            style,
          ]}
        >
          <Text variant="d2" color={currentText === placeholder ? 'gray300' : 'text'} paddingLeft="x1">
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

export default NumberKeyboardFilter;
