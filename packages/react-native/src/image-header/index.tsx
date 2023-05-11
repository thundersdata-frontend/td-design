import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { ImageBackground, ImageSourcePropType, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import WingBlank from '../wing-blank';
import AnimateHeader from './AnimateHeader';

const { px, isIOS } = helpers;
export type ImageHeaderProps = PropsWithChildren<{
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
}>;

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

  const styles = StyleSheet.create({
    header: {
      paddingTop: isIOS ? insets.top + theme.spacing.x2 : theme.spacing.x5 + StatusBar.currentHeight!,
      paddingBottom: theme.spacing.x2,
      paddingRight: theme.spacing.x3,
      backgroundColor: headerBackgroundColor,
    },
  });

  const renderHeaderLeft = () => {
    if (headerLeft) {
      if (typeof headerLeft === 'string') {
        return (
          <Text style={{ color: headerLeftColor }} fontSize={px(16)}>
            {headerLeft}
          </Text>
        );
      }
      return headerLeft;
    }
    return <SvgIcon name="left" size={px(20)} color={headerLeftColor} />;
  };

  return (
    <ImageBackground source={headerBackgroundImg} style={{ width: '100%', height: headerHeight }}>
      <Flex style={styles.header}>
        {showLeft ? (
          <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={{ flex: 1, paddingLeft: theme.spacing.x2 }}>
            {renderHeaderLeft()}
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
ImageHeader.displayName = 'ImageHeader';

export default Object.assign(ImageHeader, { AnimateHeader });
