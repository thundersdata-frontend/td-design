import React, { FC, ReactNode } from 'react';
import { ImageBackground, ImageSourcePropType, StatusBar, TouchableOpacity } from 'react-native';
import helpers from '../helpers';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme';
import SvgIcon from '../svg-icon';
import Flex from '../flex';
import Box from '../box';
import Text from '../text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WingBlank from '../wing-blank';
import AnimateHeader from './AnimateHeader';

const { px, isIOS } = helpers;
export interface ImageHeaderProps {
  /** 头部右侧内容 */
  headerRight?: ReactNode;
  /** 头部左侧内容 */
  headerLeft?: ReactNode;
  /** 左侧返回键和字体颜色 */
  headerLeftColor?: string;
  /** 头部底色，默认为透明 */
  headerBackgroundColor?: string;
  /** 头部背景图片 */
  headerBackgroundImg: ImageSourcePropType;
  /** 头部高度 */
  headerHeight?: number;
  /** 左侧点击事件 */
  onPress?: () => void;
  /** 是否显示左侧图标 */
  showLeft?: boolean;
  /** 头部title */
  headerTitle?: ReactNode;
}

const ImageHeader: FC<ImageHeaderProps> = props => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  const {
    headerRight,
    headerLeft,
    headerLeftColor = theme.colors.icon,
    headerBackgroundColor = theme.colors.transparent,
    headerBackgroundImg,
    headerHeight,
    children,
    onPress,
    showLeft = true,
    headerTitle,
  } = props;

  return (
    <ImageBackground source={headerBackgroundImg} style={{ width: '100%', height: headerHeight }}>
      <Flex
        style={{
          paddingTop: isIOS ? insets.top + theme.spacing.x2 : theme.spacing.x5 + StatusBar.currentHeight!,
          paddingBottom: theme.spacing.x2,
          paddingRight: theme.spacing.x3,
          backgroundColor: headerBackgroundColor,
        }}
      >
        {showLeft ? (
          <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={{ flex: 1, paddingLeft: theme.spacing.x2 }}>
            <Flex>
              <SvgIcon name="left" size={px(20)} color={headerLeftColor} />
              {typeof headerLeft === 'string' ? (
                <Text style={{ color: headerLeftColor }} fontSize={px(16)}>
                  {headerLeft}
                </Text>
              ) : (
                headerLeft
              )}
            </Flex>
          </TouchableOpacity>
        ) : (
          <Box flex={1} />
        )}
        {typeof headerTitle === 'string' ? (
          <Text style={{ color: theme.colors.gray200 }} fontSize={px(16)}>
            {headerTitle}
          </Text>
        ) : (
          headerTitle
        )}
        <Box flex={1} alignItems="flex-end">
          {headerRight}
        </Box>
      </Flex>
      <WingBlank>{children}</WingBlank>
    </ImageBackground>
  );
};

export default Object.assign(ImageHeader, { AnimateHeader });
