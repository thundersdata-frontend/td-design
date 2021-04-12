import React, { FC, ReactNode } from 'react';
import { ImageBackground, ImageSourcePropType, StatusBar, TouchableOpacity } from 'react-native';
import { px, isIOS } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Icon from '../icon';
import Flex from '../flex';
import Box from '../box';
import Text from '../text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WingBlank from '../wing-blank';
import AnimateHeader from './AnimateHeader';

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
  headerHeight: number;
  navigation?: any;
}

const ImageHeader: FC<ImageHeaderProps> = props => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  const {
    headerRight,
    headerLeft,
    headerLeftColor = theme.colors.imageheader_left,
    headerBackgroundColor = theme.colors.imageheader_background,
    headerBackgroundImg,
    headerHeight,
    children,
    navigation,
  } = props;

  return (
    <ImageBackground source={headerBackgroundImg} style={{ width: '100%', height: headerHeight }}>
      <Flex
        style={{
          paddingTop: isIOS ? insets.top + theme.spacing.s : theme.spacing.xl + StatusBar.currentHeight!,
          paddingBottom: theme.spacing.s,
          paddingRight: theme.spacing.xs,
          backgroundColor: headerBackgroundColor,
        }}
      >
        {navigation?.canGoBack() ? (
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation?.goBack()} style={{ flex: 1 }}>
            <Flex>
              <Icon name="left" size={px(24)} color={headerLeftColor} />
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
        <Box flex={1} alignItems="flex-end">
          {headerRight}
        </Box>
      </Flex>
      <WingBlank>{children}</WingBlank>
    </ImageBackground>
  );
};

export default Object.assign(ImageHeader, { AnimateHeader });
