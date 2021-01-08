import React, { FC, ReactElement, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { useTransition, mix } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';
import Box from '../box';
import Text from '../text';
import Icon from '../icon';
import { ONE_PIXEL, px } from '../helper';
import { Theme } from '../config/theme';

import Chevron from './Chevron';
import { MenuGroupProps } from './type';

const MenuGroup: FC<MenuGroupProps> = ({
  title,
  left,
  onSelect,
  disabled,
  width,
  height,
  selectedIndex,
  id,
  section,
  activeBgColor,
  inactiveBgColor,
  activeTextColor,
  inactiveTextColor,
  children,
  style,
}) => {
  if (!children) {
    throw new Error('MenuGroup 下必须要有 MenuItem');
  }

  const theme = useTheme<Theme>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(section === id);
  }, [section, id]);

  const transition = useTransition(open, { duration: 300, easing: Easing.inOut(Easing.ease) });
  const containerHeight = mix(transition, 0, React.Children.count(children) * height!);
  const borderBottomWidth = mix(transition, ONE_PIXEL, 0);

  return (
    <Animated.View key={id} style={[{ width, borderBottomWidth, borderBottomColor: theme.colors.borderColor }, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(open => !open)}
        disabled={disabled}
        style={{
          height,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {left && <Icon {...left} size={left.size ?? px(20)} />}
        <Box flex={1}>
          <Text>{title}</Text>
        </Box>
        <Chevron {...{ transition }} />
      </TouchableOpacity>
      <Animated.View style={{ height: containerHeight, overflow: 'hidden' }}>
        {React.Children.map(children, child => {
          return React.cloneElement(child as ReactElement, {
            onSelect,
            width,
            height,
            selectedIndex,
            inGroup: true,
            activeBgColor,
            inactiveBgColor,
            activeTextColor,
            inactiveTextColor,
          });
        })}
      </Animated.View>
    </Animated.View>
  );
};
MenuGroup.displayName = 'MenuGroup';

export default MenuGroup;
