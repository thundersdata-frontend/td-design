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
      onCheck,
      placeholder = '请输入',
      type,
      style,
      inputStyle,
      extra,
      allowClear = true,
      digit = 0,
      minHeight = px(40),
      brief,
      activeOpacity = 0.5,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { visible, setTrue, setFalse, clearIconStyle, currentText, handleSubmit, handleInputClear } =
      useNumberKeyboard({
        value,
        onCheck,
        onChange,
        digit,
        type,
        placeholder,
        ref,
      });

    const styles = StyleSheet.create({
      content: {
        flex: 1,
        minHeight,
        justifyContent: 'center',
      },
      clearIcon: { width: 0, overflow: 'hidden', alignItems: 'center' },
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
            activeOpacity={activeOpacity}
            onPress={() => {
              Keyboard.dismiss();
              setTrue();
            }}
            style={styles.content}
          >
            <Text
              variant="p1"
              color={currentText === placeholder ? 'gray300' : 'text'}
              paddingLeft="x1"
              textAlign={'right'}
              style={inputStyle}
              selectable
            >
              {currentText}
            </Text>
          </TouchableOpacity>
          {allowClear && (
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
        {!!brief && (
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
          activeOpacity={activeOpacity}
        />
      </Box>
    );
  }
);
NumberKeyboardInput.displayName = 'NumberKeyboardInput';

export default NumberKeyboardInput;
