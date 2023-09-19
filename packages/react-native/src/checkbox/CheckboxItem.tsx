import React, { FC, memo } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import Pressable from '../pressable';
import SvgIcon, { IconNames } from '../svg-icon';
import Text from '../text';
import type { Theme } from '../theme';
import type { CheckboxItemProps } from './type';

const mapping: Record<string, IconNames> = {
  checked: 'checkboxChecked',
  unchecked: 'checkboxUnchecked',
  halfchecked: 'checkboxHalfchecked',
};

const CheckboxItem: FC<CheckboxItemProps> = ({
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

  const styles = StyleSheet.create({
    list: {
      width: '100%',
    },
  });

  const handleChange = () => {
    Keyboard.dismiss();
    if (disabled) return;
    onChange?.(value, status);
  };

  const renderLabel = () => {
    if (typeof label === 'string')
      return (
        <Text variant="p1" color={disabled ? 'disabled' : 'text'} style={labelStyle}>
          {label}
        </Text>
      );
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
CheckboxItem.displayName = 'CheckboxItem';

export default memo(CheckboxItem);
