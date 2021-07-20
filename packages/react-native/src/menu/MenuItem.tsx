import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Box from '../box';
import Text from '../text';
import Icon from '../icon';
import helpers from '../helpers';
import { Theme } from '../theme';

import { MenuItemProps } from './type';

const { ONE_PIXEL, px } = helpers;
const MenuItem: FC<MenuItemProps> = ({
  title,
  left,
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
    activeBgColor = theme.colors.primary200,
    inactiveBgColor = theme.colors.primary400,
    activeTextColor = theme.colors.text_active,
    inactiveTextColor = theme.colors.text,
  } = restProps;

  const [selected, setSelected] = useState(selectedIndex === id);

  useEffect(() => {
    setSelected(selectedIndex === id);
  }, [selectedIndex, id]);

  return (
    <TouchableOpacity
      key={id}
      activeOpacity={0.5}
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
          paddingLeft: inGroup ? theme.spacing.x3 : 0,
          backgroundColor: selected ? activeBgColor : inactiveBgColor,
        },
        style,
      ]}
    >
      {left && <Icon name={left.name} color={selected ? left.activeColor : left.color} size={left.size ?? px(16)} />}
      <Box flex={1}>
        <Text variant="h1" color="gray500" style={{ color: selected ? activeTextColor : inactiveTextColor }}>
          {title}
        </Text>
      </Box>
      <Icon name="right" color={selected ? activeTextColor : inactiveTextColor} size={px(16)} />
    </TouchableOpacity>
  );
};
MenuItem.displayName = 'MenuItem';

export default MenuItem;
