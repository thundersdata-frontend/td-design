import React, { FC } from 'react';

import Box from '../box';
import helpers from '../helpers';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import { IndexPath, MenuProps } from './type';
import useMenu from './useMenu';

const { deviceWidth } = helpers;
const Menu: FC<MenuProps> = ({
  width = deviceWidth,
  children,
  selectedIndex = {},
  onSelect,
  itemHeight,
  activeBgColor,
  inactiveBgColor,
  activeTextColor,
  inactiveTextColor,
  style,
}) => {
  const _children = useMenu({
    children,
    width,
    selectedIndex,
    onSelect,
    itemHeight,
    activeBgColor,
    inactiveBgColor,
    activeTextColor,
    inactiveTextColor,
  });
  return (
    <Box width={width} style={style}>
      {_children}
    </Box>
  );
};

export type { IndexPath };
export default Object.assign(Menu, { MenuGroup, MenuItem });
