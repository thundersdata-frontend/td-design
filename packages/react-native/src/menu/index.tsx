import React, { FC } from 'react';

import { Box, helpers } from '@td-design/react-native';

import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import { MenuItemProps, MenuProps } from './type';
import useMenu from './useMenu';

const { deviceWidth } = helpers;
const Menu: FC<MenuProps> = props => {
  const {
    items,
    multiple = false,
    selectedKey,
    defaultSelectedKey,
    width = deviceWidth,
    onSelect,
    activeOpacity = 0.6,
    style,
    itemStyle,
    activeColor,
    activeTextColor,
  } = props;
  const { currentKey, openKeys, setOpenKeys, handleSelect } = useMenu({
    selectedKey,
    defaultSelectedKey,
    onSelect,
    items,
    multiple,
  });

  const renderItem = (item: MenuItemProps, level: number) => {
    if (item.items && Array.isArray(item.items) && item.items.length > 0) {
      return (
        <MenuGroup
          key={item.id}
          {...item}
          {...{
            itemStyle,
            activeOpacity,
            onSelect: handleSelect,
            currentKey,
            openKeys,
            setOpenKeys,
            level,
          }}
        >
          {item.items.map(item => renderItem(item, level + 1))}
        </MenuGroup>
      );
    }
    return (
      <MenuItem
        key={item.id}
        {...item}
        {...{
          level,
          itemStyle,
          activeOpacity,
          onSelect: handleSelect,
          currentKey,
          activeColor,
          activeTextColor,
        }}
      />
    );
  };

  return (
    <Box width={width} style={style}>
      {items.map(item => renderItem(item, 1))}
    </Box>
  );
};
Menu.displayName = 'Menu';

export default Menu;
