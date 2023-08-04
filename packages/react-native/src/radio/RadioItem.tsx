import React, { FC, memo } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import Pressable from '../pressable';
import SvgIcon, { IconNames } from '../svg-icon';
import Text from '../text';
import type { Theme } from '../theme';
import type { RadioItemProps } from './type';

const mapping: Record<string, IconNames> = {
  checked: 'radio-checked',
  unchecked: 'radio-unchecked',
};

const RadioItem: FC<RadioItemProps> = ({
  mode,
  size,
  status,
  label,
  value,
  isLast = false,
  disabled,
  itemStyle,
  labelStyle,
  onChange,
  activeOpacity,
}) => {
  const theme = useTheme<Theme>();

  const handleChange = () => {
    Keyboard.dismiss();
    if (disabled) return;
    onChange?.(value, status);
  };

  const styles = StyleSheet.create({
    list: { width: '100%', flex: 1 },
  });

  const renderLabel = () => {
    if (typeof label === 'string') {
      return (
        <Text variant="p1" color={disabled ? 'disabled' : 'gray500'} style={labelStyle}>
          {label}
        </Text>
      );
    }
    return label;
  };

  if (!disabled)
    return (
      <Pressable
        onPress={handleChange}
        activeOpacity={activeOpacity}
        style={[mode === 'list' && styles.list, itemStyle]}
      >
        <Flex marginRight={isLast ? 'x0' : 'x2'} style={mode === 'list' && styles.list}>
          <Box marginRight="x1">
            <SvgIcon name={mapping[status]} color={theme.colors.primary200} size={size} />
          </Box>
          {renderLabel()}
        </Flex>
      </Pressable>
    );

  return (
    <Box style={[mode === 'list' && styles.list, itemStyle]}>
      <Flex marginRight={isLast ? 'x0' : 'x2'} style={mode === 'list' && styles.list}>
        <Box marginRight="x1">
          <SvgIcon name={mapping[status]} color={theme.colors.disabled} size={size} />
        </Box>
        {renderLabel()}
      </Flex>
    </Box>
  );
};
RadioItem.displayName = 'RadioItem';

export default memo(RadioItem);
