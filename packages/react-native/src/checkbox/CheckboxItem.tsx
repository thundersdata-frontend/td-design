import React, { FC } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Flex from '../flex';
import Box from '../box';
import Text from '../text';
import SvgIcon, { IconNames } from '../svg-icon';

import type { Theme } from '../theme';
import type { CheckboxItemProps } from './type';

const mapping: Record<string, IconNames> = {
  checked: 'checkboxChecked',
  unchecked: 'checkboxUnchecked',
  halfchecked: 'checkboxHalfchecked',
};

export const CheckboxItem: FC<CheckboxItemProps> = ({
  mode,
  size,
  status,
  label,
  value,
  disabled,
  itemStyle,
  labelStyle,
  onChange,
}) => {
  const theme = useTheme<Theme>();

  const handleChange = () => {
    Keyboard.dismiss();
    if (disabled) return;
    onChange?.(value, status);
  };

  return (
    <TouchableOpacity
      onPress={handleChange}
      activeOpacity={disabled ? 1 : 0.5}
      style={[mode === 'list' ? { width: '100%', flex: 1 } : {}, itemStyle]}
    >
      <Flex marginRight="x2" style={mode === 'list' ? { flex: 1, width: '100%' } : {}}>
        <Box marginRight="x1">
          <SvgIcon
            name={mapping[status]}
            color={disabled ? theme.colors.disabled : theme.colors.primary200}
            size={size}
          />
        </Box>
        {typeof label === 'string' ? (
          <Text variant="p1" color={disabled ? 'disabled' : 'gray500'} style={labelStyle}>
            {label}
          </Text>
        ) : (
          label
        )}
      </Flex>
    </TouchableOpacity>
  );
};
