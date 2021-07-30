import React, { FC, useCallback, useEffect, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import Text from '../text';
import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import NumberKeyboardModal from './NumberKeyboardModal';
import { Theme } from '../theme';
import Toast from '../toast';
import { NumberKeyboardFilterProps } from './type';
import { formatValue } from './util';
import SvgIcon from '../svg-icon';

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
  const [visible, setVisible] = useState(false);
  const [currentText, setCurrentText] = useState(placeholder);

  useEffect(() => {
    setCurrentText(value ? value + '' : placeholder);
  }, [value, placeholder]);

  /**
   * 根据type对value进行合法性校验
   */
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
            setVisible(true);
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
          <Text variant="p1" color={currentText === placeholder ? 'gray300' : 'text'} paddingLeft="x1">
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

export default NumberKeyboardFilter;
