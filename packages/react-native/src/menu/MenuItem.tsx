import { useTheme } from '@shopify/restyle';
import { useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import Box from '../box';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { MenuItemProps } from './type';

const { ONE_PIXEL, px } = helpers;
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
    activeBgColor = theme.colors.primary200,
    inactiveBgColor = theme.colors.primary400,
    activeTextColor = theme.colors.text_active,
    inactiveTextColor = theme.colors.text,
  } = restProps;

  const [selected, setSelected] = useSafeState(selectedIndex === id);

  useUpdateEffect(() => {
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
          paddingLeft: inGroup ? theme.spacing.x4 : theme.spacing.x2,
          paddingRight: theme.spacing.x1,
          backgroundColor: selected ? activeBgColor : inactiveBgColor,
        },
        style,
      ]}
    >
      {left}
      <Box flex={1}>
        <Text variant="h1" color="gray500" style={{ color: selected ? activeTextColor : inactiveTextColor }}>
          {title}
        </Text>
      </Box>
      <Box>
        {right ?? <SvgIcon name="right" color={selected ? activeTextColor : inactiveTextColor} size={px(16)} />}
      </Box>
    </TouchableOpacity>
  );
};
MenuItem.displayName = 'MenuItem';

export default MenuItem;
