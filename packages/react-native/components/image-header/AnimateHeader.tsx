import React, { ReactNode } from 'react';
import { useTheme } from '@shopify/restyle';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { interpolateColor } from 'react-native-redash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { px, ONE_PIXEL, deviceWidth } from '../helper';
import Icon from '../icon';
import { Theme } from '../config/theme';
import { TextStyle, TouchableOpacity } from 'react-native';
import Text from '../text';
import Flex from '../flex';
import { StackHeaderProps } from '@react-navigation/stack';
const HEADER_HEIGHT = px(44);

export interface AnimateHeaderProps extends StackHeaderProps {
  /** 头部文字 */
  headerTitle: string;
  /** 头部文字样式 */
  headerTitleStyle?: TextStyle;
  /** 滚动距离 */
  scrollY?: Animated.Value<0>;
  /** 纵向滚动到哪个值时显示普通header */
  scrollHeight?: number;
  /** 头部右侧内容 */
  headerRight?: ReactNode;
  /** 左侧返回键和字体颜色 */
  headerLeftColor?: string;
  /** 头部左侧文字 */
  headerLeftText?: ReactNode;
  /** 头部底色，默认为透明 */
  headerBackgroundColor?: string;
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
    headerLeftText,
    headerBackgroundColor = theme.colors.white,
  } = props;

  const opacity = interpolate(scrollY, {
    inputRange: [-HEADER_HEIGHT - insets.top, 0, scrollHeight],
    outputRange: [1, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const borderBottomWidth = interpolate(scrollY, {
    inputRange: [-HEADER_HEIGHT - insets.top, 0, scrollHeight],
    outputRange: [ONE_PIXEL, 0, ONE_PIXEL],
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
        <TouchableOpacity onPress={() => navigation?.goBack()} style={{ flex: 1 }}>
          <Flex>
            <Icon name="left" size={px(24)} color={headerLeftColor} />
            {headerLeftText && (
              <Text fontSize={px(16)} style={{ color: headerLeftColor }}>
                {headerLeftText}
              </Text>
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
