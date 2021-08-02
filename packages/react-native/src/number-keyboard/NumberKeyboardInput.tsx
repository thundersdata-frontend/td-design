import React, { FC, useCallback, useEffect, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import Text from '../text';
import helpers from '../helpers';
import NumberKeyboardModal from './NumberKeyboardModal';
import { Theme } from '../theme';
import Flex from '../flex';
import Toast from '../toast';
import Box from '../box';
import { NumberKeyboardInputProps } from './type';
import { formatValue } from './util';
import SvgIcon from '../svg-icon';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px } = helpers;
const NumberKeyboardInput: FC<NumberKeyboardInputProps> = ({
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
  const [visible, setVisible] = useState(false);
  const [currentText, setCurrentText] = useState(placeholder);

  useEffect(() => {
    setCurrentText(value ? value + '' : placeholder);
  }, [value, placeholder]);

  const handleSubmit = useCallback(
    (value: string) => {
      if (value.split('').filter(item => item === '.').length > 1) {
        Toast.fail({ content: '输入的数字格式不合法' });
        return;
      }
      const text = formatValue(value, type, digit) + '';
      setCurrentText(`${text}` ?? placeholder);
      setVisible(false);
      onChange?.(`${text}`);
    },
    [onChange, placeholder, type, digit]
  );

  const handleInputClear = () => {
    setCurrentText(placeholder);
    onChange?.('');
  };

  const clearIconStyle = useAnimatedStyle(() => {
    return {
      width: !!currentText && currentText !== placeholder ? withTiming(24) : withTiming(0),
    };
  });

  return (
    <Box>
      <Flex>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Keyboard.dismiss();
            setVisible(true);
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
        onClose={() => setVisible(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default NumberKeyboardInput;
