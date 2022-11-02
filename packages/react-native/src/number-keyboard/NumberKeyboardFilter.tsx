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
import { NumberKeyboardFilterProps, NumberKeyboardRef } from './type';
import useNumberKeyboard from './useNumberKeyboard';

const { px, ONE_PIXEL } = helpers;
const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const NumberKeyboardFilter = forwardRef<NumberKeyboardRef, NumberKeyboardFilterProps>(
  (
    {
      label,
      value,
      onChange,
      placeholder = '请输入',
      type,
      style,
      allowClear = true,
      digit = 0,
      brief,
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
      <Box>
        <Flex marginRight="x2" marginBottom="x1" alignItems="center">
          <Text variant="p1" color="gray500">
            {label}
          </Text>
        </Flex>
        <Flex borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1" style={style}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              Keyboard.dismiss();
              setTrue();
            }}
            onLongPress={() => {
              selectable && tooltipRef?.current?.show();
            }}
            style={[
              {
                flex: 1,
                height: px(40),
                justifyContent: 'center',
              },
            ]}
          >
            <Tooltips value={currentText} onChange={handleSubmit} ref={tooltipRef} type={type}>
              <Text variant="d2" color={currentText === placeholder ? 'gray300' : 'text'} paddingLeft="x1">
                {currentText}
              </Text>
            </Tooltips>
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

export default NumberKeyboardFilter;
