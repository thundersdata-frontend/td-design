import React, { FC, ReactNode } from 'react';
import { View, Text, TextStyle, ImageBackground, ImageSourcePropType } from 'react-native';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Icon from '../icon';
import Flex from '../flex';
import { StackHeaderProps } from '@react-navigation/stack';

export interface HeaderProps extends StackHeaderProps {
  /** 头部标题 */
  headerTitle: ReactNode;
  /** 头部标题样式 */
  headerTitleStyle?: TextStyle;
  /** 头部右侧内容 */
  headerRight?: ReactNode;
  /** 头部左侧文字 */
  headerLeftText?: ReactNode;
  /** 头部左侧返回键颜色 */
  backIconColor?: string;
  /** 头部底色，默认为白色 */
  headerBackgroundColor?: string;
  /** 头部背景图片 */
  headerBackgroundImg?: ImageSourcePropType;
  /** 头部高度（当有背景图片时需要设置） */
  headerHeight?: number;
}

const Header: FC<HeaderProps> = props => {
  const theme = useTheme<Theme>();

  const {
    headerTitle,
    headerRight,
    headerTitleStyle,
    headerLeftText,
    backIconColor = theme.colors.primaryTextColor,
    headerBackgroundColor = theme.colors.warningColor1,
    headerBackgroundImg,
    headerHeight,
    children,
    navigation,
  } = props;

  const height = px(50);

  const HeaderComp = () => (
    <View
      style={{
        height,
        backgroundColor: headerBackgroundImg ? 'transparent' : headerBackgroundColor,
        paddingHorizontal: px(12),
        flexDirection: 'row',
      }}
    >
      <Flex flex={1} justifyContent="flex-start" alignItems="center">
        {navigation.canGoBack() && (
          <>
            <Icon name="left" size={px(20)} color={backIconColor} />
            {headerLeftText}
          </>
        )}
      </Flex>
      <Flex flex={3} justifyContent="center" alignItems="center">
        <Text
          style={[
            {
              textAlign: 'center',
              ...theme.textVariants.primaryTitle,
            },
            headerTitleStyle,
          ]}
        >
          {headerTitle}
        </Text>
      </Flex>
      <Flex flex={1} justifyContent="flex-end" alignItems="center">
        {headerRight}
      </Flex>
    </View>
  );

  if (headerBackgroundImg) {
    return (
      <ImageBackground source={headerBackgroundImg} style={{ width: '100%', height: headerHeight }}>
        <HeaderComp />
        {children}
      </ImageBackground>
    );
  }

  return <HeaderComp />;
};

export default Header;
