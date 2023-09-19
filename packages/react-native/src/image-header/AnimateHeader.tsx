import React, { ReactNode } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';

const { px, ONE_PIXEL, deviceWidth } = helpers;
const HEADER_HEIGHT = px(44);
export interface AnimateHeaderProps {
  /** 头部文字 */
  headerTitle: string;
  /** 头部文字样式 */
  headerTitleStyle?: TextStyle;
  /** 滚动距离 */
  scrollY: Animated.SharedValue<number>;
  /** 纵向滚动到哪个值时显示ImageHeader */
  scrollHeight?: number;
  /** 头部右侧内容 */
  headerRight?: ReactNode;
  /** 左侧返回键和字体颜色 */
  headerLeftColor?: string;
  /** 头部左侧内容 */
  headerLeft?: ReactNode;
  /** 头部底色，默认为透明 */
  headerBackgroundColor?: string;
  /** 左侧点击事件 */
  onPress?: () => void;
  /** 是否显示左侧图标 */
  showLeft?: boolean;
  /** 按下时的不透明度 */
  activeOpacity?: number;
}

const AnimateHeader: React.FC<AnimateHeaderProps> = props => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  const {
    scrollY,
    headerTitle,
    headerTitleStyle,
    scrollHeight = 300,
    onPress,
    showLeft = true,
    headerRight,
    headerLeftColor = theme.colors.text,
    headerLeft,
    headerBackgroundColor = theme.colors.white,
    activeOpacity = 0.6,
  } = props;

  const inputRange = [0, scrollHeight];
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, inputRange, [0, 1], Extrapolate.CLAMP);
    const borderBottomWidth = interpolate(scrollY.value, inputRange, [0, ONE_PIXEL], Extrapolate.CLAMP);
    const backgroundColor = interpolateColor(scrollY.value, inputRange, ['transparent', headerBackgroundColor]);

    return {
      borderBottomWidth,
      backgroundColor,
      opacity,
    };
  });

  const styles = StyleSheet.create({
    header: {
      width: deviceWidth,
      position: 'absolute',
      top: 0,
      zIndex: 99,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: theme.colors.border,
      paddingTop: insets.top,
      height: HEADER_HEIGHT + insets.top,
    },
  });

  return (
    <Animated.View style={[styles.header, style]}>
      <Flex flex={1}>
        {showLeft ? (
          <Pressable activeOpacity={activeOpacity} onPress={onPress} style={{ flex: 1 }}>
            <Flex>
              <SvgIcon name="left" size={px(24)} color={headerLeftColor} />
              {typeof headerLeft === 'string' ? (
                <Text variant="p0" style={{ color: headerLeftColor }}>
                  {headerLeft}
                </Text>
              ) : (
                headerLeft
              )}
            </Flex>
          </Pressable>
        ) : (
          <Box flex={1} />
        )}
        <Animated.View style={{ flex: 5, alignItems: 'center' }}>
          <Text variant="h1" color="text" numberOfLines={1} style={headerTitleStyle}>
            {headerTitle}
          </Text>
        </Animated.View>
        <Box flex={1} alignItems="flex-end">
          {headerRight}
        </Box>
      </Flex>
    </Animated.View>
  );
};
AnimateHeader.displayName = 'AnimateHeader';

export default AnimateHeader;
