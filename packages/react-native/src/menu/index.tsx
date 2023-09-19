import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import helpers from '../helpers';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import { MenuItemProps, MenuProps } from './type';
import useMenu from './useMenu';

const { deviceWidth } = helpers;
const Menu: FC<MenuProps> = props => {
  const {
    data,
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
    data,
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
    <ScrollView bounces={false} horizontal={false} showsVerticalScrollIndicator={false} style={[{ width }, style]}>
      {data.map(item => renderItem(item, 1))}
    </ScrollView>
  );
};
Menu.displayName = 'Menu';

export default Menu;
