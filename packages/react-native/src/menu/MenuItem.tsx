import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Box from '../box';
import Text from '../text';
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
    activeBgColor = theme.colors.menu_active_background,
    inactiveBgColor = theme.colors.menu_inactive_background,
    activeTextColor = theme.colors.menu_active_text,
    inactiveTextColor = theme.colors.menu_inactive_text,
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
          borderBottomColor: theme.colors.border,
          paddingLeft: inGroup ? theme.spacing.m : 0,
          backgroundColor: selected ? activeBgColor : inactiveBgColor,
        },
        style,
      ]}
    >
      {left && <Icon name={left.name} color={selected ? left.activeColor : left.color} size={left.size ?? px(16)} />}
      <Box flex={1}>
        <Text variant="title1" style={{ color: selected ? activeTextColor : inactiveTextColor }}>
          {title}
        </Text>
      </Box>
      <Icon name="right" color={selected ? activeTextColor : inactiveTextColor} size={px(16)} />
    </TouchableOpacity>
  );
};
MenuItem.displayName = 'MenuItem';

export default MenuItem;
