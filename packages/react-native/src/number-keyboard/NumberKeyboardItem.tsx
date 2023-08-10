import React, { forwardRef } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import NumberKeyboardModal from './NumberKeyboardModal';
import { NumberKeyboardItemProps, NumberKeyboardRef } from './type';
import useNumberKeyboard from './useNumberKeyboard';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px } = helpers;
const NumberKeyboardItem = forwardRef<NumberKeyboardRef, NumberKeyboardItemProps>(
  (
    {
      value,
      onChange,
      onCheck,
      placeholder = '请输入',
      disabled = false,
      type,
      style,
      inputStyle,
      extra,
      allowClear = true,
      digit = 0,
      minHeight = px(40),
      activeOpacity = 0.5,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { visible, setTrue, setFalse, clearIconStyle, currentText, handleSubmit, handleInputClear } =
      useNumberKeyboard({
        value,
        onChange,
        onCheck,
        digit,
        type,
        placeholder,
        ref,
      });

    const styles = StyleSheet.create({
      content: {
        flexGrow: 1,
        minHeight,
        justifyContent: 'center',
      },
      clearIcon: { width: 0, overflow: 'hidden', alignItems: 'center' },
    });

    return (
      <Box width="100%">
        <Flex style={style}>
          <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={() => {
              Keyboard.dismiss();
              if (disabled) return;
              setTrue();
            }}
            style={styles.content}
          >
            <Text
              variant="p1"
              color={currentText === placeholder ? 'gray300' : 'text'}
              textAlign={'right'}
              style={inputStyle}
              selectable
            >
              {currentText}
            </Text>
          </TouchableOpacity>
          {allowClear && !disabled && (
            <AnimatedTouchableIcon
              activeOpacity={1}
              onPress={handleInputClear}
              style={[styles.clearIcon, clearIconStyle]}
            >
              <SvgIcon name="closecircleo" color={theme.colors.icon} />
            </AnimatedTouchableIcon>
          )}
          {!!extra && <Box>{typeof extra === 'string' ? <Text>{extra}</Text> : extra}</Box>}
        </Flex>
        <NumberKeyboardModal
          {...restProps}
          type={type}
          value={currentText === placeholder ? '' : currentText}
          visible={visible}
          onClose={setFalse}
          onSubmit={handleSubmit}
          activeOpacity={activeOpacity}
        />
      </Box>
    );
  }
);
NumberKeyboardItem.displayName = 'NumberKeyboardItem';

export default NumberKeyboardItem;
