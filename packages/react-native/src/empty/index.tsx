import React, { ReactNode } from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { backgroundColor, layout, useRestyle, BackgroundColorProps, LayoutProps } from '@shopify/restyle';
import { Theme } from '../theme';
import Box from '../box';
import Text from '../text';
import helpers from '../helpers';
import Image from '../image';
import base64Str from './img';

const { px } = helpers;

type EmptyProps = BackgroundColorProps<Theme> &
  LayoutProps<Theme> & {
    /** 是否为空 */
    isEmpty?: boolean;
    /** 暂无数据的文字dom */
    emptyText?: ReactNode;
    /** 图片样式 */
    imgStyle?: StyleProp<ImageStyle>;
    /** 自定义img,传一个URL或者ReactNode */
    img?: ReactNode;
  };

const restyleFunctions = [layout, backgroundColor];

const Empty: React.FC<EmptyProps> = ({ children, ...restProps }) => {
  const {
    isEmpty = false,
    emptyText = '暂无数据',
    imgStyle,
    backgroundColor = 'background',
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

  const renderTextDom = () => {
    if (typeof emptyText === 'string') {
      return (
        <Text variant="p0" color="gray500">
          {emptyText}
        </Text>
      );
    }
    return emptyText;
  };

  const renderImgDom = () => {
    const defaultImgStyle: StyleProp<ImageStyle> = {
      width: px(214),
      height: px(192),
    };

    if (img) {
      if (typeof img === 'string') {
        return <Image style={{ ...defaultImgStyle, ...(imgStyle as any) }} source={{ uri: img }} />;
      }
      return img;
    }

    return (
      <Image
        style={{ ...defaultImgStyle, ...(imgStyle as any) }}
        source={{
          uri: `data:image/png;base64,${base64Str}`,
        }}
      />
    );
  };

  return isEmpty ? (
    <Box {...props}>
      {renderImgDom()}
      {renderTextDom()}
    </Box>
  ) : (
    <>{children}</>
  );
};

export default Empty;
