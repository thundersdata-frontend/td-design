import React, { FC, ReactNode } from 'react';
import { ImageBackground, ImageSourcePropType, TouchableWithoutFeedback } from 'react-native';
import { px, isIOS } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Icon from '../icon';
import Flex from '../flex';
import { StackHeaderProps } from '@react-navigation/stack';
import Box from '../box';
import Text from '../text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WingBlank from '../wing-blank';
import AnimateHeader from './AnimateHeader';

export interface ImageHeaderProps extends StackHeaderProps {
  /** 头部右侧内容 */
  headerRight?: ReactNode;
  /** 头部左侧文字 */
  headerLeftText?: ReactNode;
  /** 左侧返回键和字体颜色 */
  headerLeftColor?: string;
  /** 头部底色，默认为透明 */
  headerBackgroundColor?: string;
  /** 头部背景图片 */
  headerBackgroundImg: ImageSourcePropType;
  /** 头部高度（当有背景图片时需要设置） */
  headerHeight: number;
}

const ImageHeader: FC<ImageHeaderProps> = props => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  const {
    headerRight,
    headerLeftText,
    headerLeftColor = theme.colors.primaryColor,
    headerBackgroundColor = theme.colors.transparent,
    headerBackgroundImg,
    headerHeight,
    children,
    navigation,
  } = props;

  return (
    <ImageBackground source={headerBackgroundImg} style={{ width: '100%', height: headerHeight }}>
      <WingBlank>
        <Flex
          justifyContent="space-between"
          paddingBottom="m"
          style={{
            paddingTop: isIOS ? insets.top : px(12),
            backgroundColor: headerBackgroundColor,
          }}
        >
          {navigation?.canGoBack() ? (
            <TouchableWithoutFeedback onPress={() => navigation?.goBack()}>
              <Flex>
                <Icon name="left" size={px(20)} color={headerLeftColor} />
                {headerLeftText && (
                  <Text style={{ color: headerLeftColor }} fontSize={px(16)}>
                    {headerLeftText}
                  </Text>
                )}
              </Flex>
            </TouchableWithoutFeedback>
          ) : (
            <Box />
          )}
          {headerRight}
        </Flex>
        {children}
      </WingBlank>
    </ImageBackground>
  );
};

export default Object.assign(ImageHeader, { AnimateHeader });
