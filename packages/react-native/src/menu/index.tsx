import React, { FC, useEffect, useState } from 'react';
import { ReactElement } from 'react';
import Box from '../box';
import { px, deviceWidth } from '../helper';

import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import { IndexPath, MenuProps } from './type';

const ITEM_HEIGHT = px(40);

const Menu: FC<MenuProps> = ({
  children,
  selectedIndex = {},
  onSelect,
  width = deviceWidth,
  itemHeight = ITEM_HEIGHT,
  activeBgColor,
  inactiveBgColor,
  activeTextColor,
  inactiveTextColor,
  style,
}) => {
  const [index, setIndex] = useState<IndexPath>();

  const selectedIndexJsonStr = JSON.stringify(selectedIndex);

  useEffect(() => {
    try {
      const selectedIndex = JSON.parse(selectedIndexJsonStr);
      setIndex(selectedIndex);
    } catch (error) {
      throw new Error('selectedIndex格式不正确');
    }
  }, [selectedIndexJsonStr]);

  const handleSelect = (selectedIndex: IndexPath) => {
    const newIndex = { ...index, ...selectedIndex };
    setIndex(newIndex);
    onSelect?.(newIndex);
  };

  const _children = React.Children.map(children, child => {
    const { displayName } = (child as any).type;
    if (displayName === 'MenuGroup') {
      return React.cloneElement(child as ReactElement, {
        width,
        height: itemHeight,
        selectedIndex: index?.row,
        section: index?.section,
        onSelect: handleSelect,
        activeBgColor,
        inactiveBgColor,
        activeTextColor,
        inactiveTextColor,
      });
    } else if (displayName === 'MenuItem') {
      return React.cloneElement(child as ReactElement, {
        width,
        height: itemHeight,
        onSelect: handleSelect,
        selectedIndex: index?.row,
        inGroup: false,
        activeBgColor,
        inactiveBgColor,
        activeTextColor,
        inactiveTextColor,
      });
    } else {
      throw new Error('Menu子项必须是MenuGroup或者MenuItem');
    }
  });

  return (
    <Box width={width} style={style}>
      {_children}
    </Box>
  );
};

export type { IndexPath };
export default Object.assign(Menu, { MenuGroup, MenuItem });
