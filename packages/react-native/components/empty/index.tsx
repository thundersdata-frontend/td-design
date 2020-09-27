import React, { ReactNode } from 'react';
import { Image, ImageStyle, TextStyle } from 'react-native';
import { backgroundColor, layout, useRestyle, BackgroundColorProps, LayoutProps } from '@shopify/restyle';
import { Box, Text, Theme } from '..';
import { px } from '../helper';

type EmptyProps = BackgroundColorProps<Theme> &
  LayoutProps<Theme> & {
    /** 是否为空 */
    isEmpty: boolean;
    /** 暂无数据的文字dom */
    emptyText?: ReactNode;
    /** 图片样式 */
    imgStyle?: ImageStyle;
    /** emptyText的fontSize */
    fontSize?: TextStyle['fontSize'];
    /** 自定义img,传一个URL或者ReactNode */
    img?: ReactNode;
  };

const restyleFunctions = [layout, backgroundColor];

const Empty: React.FC<EmptyProps> = ({ children, ...restProps }) => {
  const {
    isEmpty,
    emptyText = '暂无数据',
    imgStyle,
    fontSize,
    backgroundColor = 'emptyBgColor',
    flex = 1,
    img,
    ...boxProps
  } = restProps;

  const props = useRestyle(restyleFunctions, {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex,
    backgroundColor,
    ...boxProps,
  });

  const renderEmptyDom = () => {
    if (typeof emptyText === 'string') {
      return (
        <Text variant="primaryTip" fontSize={fontSize}>
          {emptyText}
        </Text>
      );
    }
    return emptyText;
  };

  const renderImgDom = () => {
    const getWideHigh = {
      width: px(214),
      height: px(192),
      ...imgStyle,
    };

    if (img) {
      if (typeof img === 'string') {
        return <Image style={{ ...getWideHigh }} source={{ uri: img }} resizeMode="contain" />;
      }
      return img;
    }

    return <Image style={{ ...getWideHigh }} source={require('./img/pic_empty.png')} resizeMode="contain" />;
  };

  return isEmpty ? (
    <Box {...props}>
      {renderImgDom()}
      {renderEmptyDom()}
    </Box>
  ) : (
    <>{children}</>
  );
};

export default Empty;
