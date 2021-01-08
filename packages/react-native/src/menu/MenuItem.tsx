import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Box from '../box';
import Icon from '../icon';
import { ONE_PIXEL, px } from '../helper';
import { Theme } from '../config/theme';

import { MenuItemProps } from './type';

const MenuItem: FC<MenuItemProps> = ({
  title,
  left,
  right,
  onPress,
  onSelect,
  disabled,
  height,
  id,
  selectedIndex,
  inGroup = false,
  style,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const {
    activeBgColor = theme.colors.primaryColor,
    inactiveBgColor = theme.colors.backgroundColor1,
    activeTextColor = theme.colors.white,
    inactiveTextColor = theme.colors.primaryTextColor,
  } = restProps;

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(selectedIndex === id);
  }, [selectedIndex, id]);

  return (
    <TouchableOpacity
      key={id}
      activeOpacity={0.8}
      onPress={() => {
        onPress?.();
        onSelect?.({ row: id! });
      }}
      disabled={disabled}
      style={[
        {
          height,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: ONE_PIXEL,
          borderBottomColor: theme.colors.borderColor,
          paddingLeft: inGroup ? theme.spacing.m : 0,
          backgroundColor: selected ? activeBgColor : inactiveBgColor,
        },
        style,
      ]}
    >
      {left && <Icon name={left.name} color={selected ? left.activeColor : left.color} size={left.size ?? px(16)} />}
      <Box flex={1}>
        <Text style={{ color: selected ? activeTextColor : inactiveTextColor }}>{title}</Text>
      </Box>
      {right && (
        <Icon name={right.name} color={selected ? right.activeColor : right.color} size={right.size ?? px(16)} />
      )}
    </TouchableOpacity>
  );
};
MenuItem.displayName = 'MenuItem';

export default MenuItem;
