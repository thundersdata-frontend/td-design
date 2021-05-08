import React, { FC, ReactElement } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import Box from '../box';
import Text from '../text';
import Icon from '../icon';
import { ONE_PIXEL, px } from '../helper';
import { Theme } from '../config/theme';

import Chevron from './Chevron';
import { MenuGroupProps } from './type';
import { useEffect } from 'react';

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
  const opened = useSharedValue(false);
  const progress = useDerivedValue(() => (opened.value ? withSpring(1) : withTiming(0)));

  useEffect(() => {
    opened.value = section === id;
  }, [id, opened, section]);

  const headerStyle = useAnimatedStyle(() => ({
    borderBottomWidth: progress.value === 0 ? 0 : ONE_PIXEL,
  }));
  const itemWrapStyle = useAnimatedStyle(() => ({
    height: progress.value * itemWrapHeight,
  }));

  return (
    <Animated.View key={id} style={[{ width, borderBottomColor: theme.colors.menu_border }, style, headerStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          opened.value = !opened.value;
        }}
        disabled={disabled}
        style={{
          height,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.menu_group_background,
        }}
      >
        {left && <Icon {...left} size={left.size ?? px(20)} />}
        <Box flex={1}>
          <Text variant="title1">{title}</Text>
        </Box>
        <Chevron {...{ progress }} />
      </TouchableOpacity>
      <Animated.View style={[{ overflow: 'hidden' }, itemWrapStyle]}>
        <View>
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
        </View>
      </Animated.View>
    </Animated.View>
  );
};
MenuGroup.displayName = 'MenuGroup';

export default MenuGroup;
