import React, { FC, memo } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
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
}) => {
  const theme = useTheme<Theme>();

  const styles = StyleSheet.create({
    list: {
      width: '100%',
      flex: 1,
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
        <Text variant="p1" color={disabled ? 'disabled' : 'gray500'} style={labelStyle}>
          {label}
        </Text>
      );
    return label;
  };

  return (
    <TouchableOpacity
      onPress={handleChange}
      activeOpacity={disabled ? 1 : 0.5}
      style={[mode === 'list' && styles.list, itemStyle]}
    >
      <Flex marginRight={isLast ? 'x0' : 'x2'} style={mode === 'list' && styles.list}>
        <Box marginRight="x1">
          <SvgIcon
            name={mapping[status]}
            color={disabled ? theme.colors.disabled : theme.colors.primary200}
            size={size}
          />
        </Box>
        {renderLabel()}
      </Flex>
    </TouchableOpacity>
  );
};
CheckboxItem.displayName = 'CheckboxItem';

export default memo(CheckboxItem);
