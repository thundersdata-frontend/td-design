import React, { FC, ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';
import Chevron from './Chevron';
import { MenuGroupProps } from './type';

const { ONE_PIXEL } = helpers;
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
  const itemWrapHeight = React.Children.count(children) * height!;
  const opened = useSharedValue(section === id);
  const progress = useDerivedValue(() => (opened.value ? withTiming(1) : withTiming(0)));

  const headerStyle = useAnimatedStyle(() => ({
    borderBottomWidth: progress.value === 1 ? 0 : ONE_PIXEL,
  }));
  const itemWrapStyle = useAnimatedStyle(() => ({
    height: progress.value * itemWrapHeight,
  }));

  return (
    <Animated.View key={id} style={[{ width, borderBottomColor: theme.colors.border }, style, headerStyle]}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          opened.value = !opened.value;
        }}
        disabled={disabled}
        style={{
          height,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.background,
        }}
      >
        {left}
        <Box flex={1} paddingLeft="x2">
          <Text variant="h1" color="gray500">
            {title}
          </Text>
        </Box>
        <Chevron {...{ progress }} />
      </TouchableOpacity>
      <Animated.View style={[{ overflow: 'hidden' }, itemWrapStyle]}>
        <Box>
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
        </Box>
      </Animated.View>
    </Animated.View>
  );
};
MenuGroup.displayName = 'MenuGroup';

export default MenuGroup;
