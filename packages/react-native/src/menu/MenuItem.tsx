import React, { FC, memo } from 'react';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { MenuItemProps } from './type';

const { ONE_PIXEL } = helpers;
const MenuItem: FC<MenuItemProps & { level: number; currentKey?: string; onSelect: (key: string) => void }> = ({
  level,
  title,
  left,
  customIcon,
  onSelect,
  disabled,
  id,
  currentKey,
  activeOpacity = 0.6,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const { activeColor = theme.colors.primary200, activeTextColor = theme.colors.text_active } = restProps;

  const selected = id === currentKey;

  return (
    <Pressable
      key={id}
      activeOpacity={activeOpacity}
      onPress={() => onSelect(id)}
      disabled={disabled}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: selected ? activeColor : theme.colors.white,
        paddingVertical: theme.spacing.x2,
        paddingHorizontal: theme.spacing.x2,
        borderBottomWidth: ONE_PIXEL,
        borderColor: theme.colors.border,
      }}
    >
      <Box>{left}</Box>
      <Box flex={1} style={{ paddingLeft: level * theme.spacing.x2 }}>
        <Text variant="p0" style={{ color: selected ? activeTextColor : theme.colors.gray500 }}>
          {title}
        </Text>
      </Box>
      <Box>{customIcon ?? <SvgIcon name="right" color={selected ? theme.colors.white : theme.colors.gray500} />}</Box>
    </Pressable>
  );
};
MenuItem.displayName = 'MenuItem';

export default memo(MenuItem);
