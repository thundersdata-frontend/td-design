import React, { ReactNode } from 'react';
import { TextStyle, TouchableOpacity } from 'react-native';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { interpolateColor } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';

import Icon from '../icon';
import Text from '../text';
import Flex from '../flex';
import { px, ONE_PIXEL, deviceWidth } from '../helper';
import { Theme } from '../config/theme';

const HEADER_HEIGHT = px(44);

export interface AnimateHeaderProps {
  /** 头部文字 */
  headerTitle: string;
  /** 头部文字样式 */
  headerTitleStyle?: TextStyle;
  /** 滚动距离 */
  scrollY?: Animated.Value<number>;
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
  navigation?: any;
}

const AnimateHeader: React.FC<AnimateHeaderProps> = props => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  const {
    scrollY = 0,
    headerTitle,
    headerTitleStyle,
    scrollHeight = 300,
    navigation,
    headerRight,
    headerLeftColor,
    headerLeft,
    headerBackgroundColor = theme.colors.white,
  } = props;

  const opacity = interpolate(scrollY, {
    inputRange: [0, scrollHeight],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const borderBottomWidth = interpolate(scrollY, {
    inputRange: [0, scrollHeight],
    outputRange: [0, ONE_PIXEL],
    extrapolate: Extrapolate.CLAMP,
  });
  const backgroundColor = interpolateColor(scrollY, {
    inputRange: [0, scrollHeight],
    outputRange: ['transparent', headerBackgroundColor],
  }) as any;

  return (
    <Animated.View
      style={{
        width: deviceWidth,
        position: 'absolute',
        top: 0,
        zIndex: 99,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: theme.colors.borderColor,
        paddingHorizontal: px(12),
        paddingTop: insets.top,
        height: HEADER_HEIGHT + insets.top,
        borderBottomWidth,
        backgroundColor,
        opacity,
      }}
    >
      <Flex flex={1}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation?.goBack()} style={{ flex: 1 }}>
          <Flex>
            <Icon name="left" size={px(20)} color={headerLeftColor} />
            {typeof headerLeft === 'string' ? (
              <Text style={{ color: headerLeftColor }} fontSize={px(16)}>
                {headerLeft}
              </Text>
            ) : (
              headerLeft
            )}
          </Flex>
        </TouchableOpacity>
        <Animated.View style={{ flex: 5, alignItems: 'center' }}>
          <Text fontSize={px(18)} numberOfLines={1} style={[{ color: headerLeftColor }, headerTitleStyle]}>
            {headerTitle}
          </Text>
        </Animated.View>
        <Flex flex={1} justifyContent="flex-end">
          {headerRight}
        </Flex>
      </Flex>
    </Animated.View>
  );
};

export default AnimateHeader;
