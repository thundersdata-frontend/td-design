import React, { ReactNode } from 'react';
import { Image, ImageStyle } from 'react-native';
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
    /** 组件宽高继承父级(填充) */
    isFill?: boolean;
    /** 自定义img,传一个URL或者ReactNode */
    img?: ReactNode;
  };

const restyleFunctions = [layout, backgroundColor];

const Empty: React.FC<EmptyProps> = ({ children, ...restProps }) => {
  const { isEmpty, emptyText = '暂无数据', imgStyle, isFill, backgroundColor = 'emptyBgColor', img } = restProps;
  const props = useRestyle(restyleFunctions, {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: isFill ? 1 : 0,
    backgroundColor,
    ...restProps,
  });

  const renderEmptyDom = () => {
    if (typeof emptyText === 'string') {
      return <Text color="primaryTipColor">{emptyText}</Text>;
    }
    return emptyText;
  };

  const renderImgDom = () => {
    if (img) {
      if (typeof img === 'string') {
        return (
          <Image style={{ width: px(140), height: px(140), ...imgStyle }} source={{ uri: img }} resizeMode="contain" />
        );
      }
      return img;
    }

    return (
      <Image
        style={{ width: px(140), height: px(140), ...imgStyle }}
        source={require('./img/pic_empty.png')}
        resizeMode="contain"
      />
    );
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
