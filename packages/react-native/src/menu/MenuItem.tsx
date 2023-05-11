import React, { FC, memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { MenuItemProps } from './type';

const { ONE_PIXEL, px } = helpers;
const BaseMenuItem: FC<MenuItemProps> = ({
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
    activeBgColor = theme.colors.primary200,
    inactiveBgColor = theme.colors.primary400,
    activeTextColor = theme.colors.text_active,
    inactiveTextColor = theme.colors.text,
  } = restProps;

  const selected = selectedIndex === id;

  const styles = StyleSheet.create({
    item: {
      height,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: ONE_PIXEL,
      borderBottomColor: theme.colors.border,
      paddingLeft: inGroup ? theme.spacing.x4 : theme.spacing.x2,
      paddingRight: theme.spacing.x1,
      backgroundColor: selected ? activeBgColor : inactiveBgColor,
    },
    text: { color: selected ? activeTextColor : inactiveTextColor },
  });

  return (
    <TouchableOpacity
      key={id}
      activeOpacity={0.5}
      onPress={() => {
        onPress?.();
        onSelect?.({ row: id! });
      }}
      disabled={disabled}
      style={[styles.item, style]}
    >
      {left}
      <Box flex={1}>
        <Text variant="h1" color="gray500" style={styles.text}>
          {title}
        </Text>
      </Box>
      <Box>
        {right ?? <SvgIcon name="right" color={selected ? activeTextColor : inactiveTextColor} size={px(16)} />}
      </Box>
    </TouchableOpacity>
  );
};

const MenuItem = memo(BaseMenuItem);
MenuItem.displayName = 'MenuItem';

export default MenuItem;
