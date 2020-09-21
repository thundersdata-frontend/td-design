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
    emptyText?: string | ReactNode;
    /** 图片样式 */
    imgStyle?: ImageStyle;
    /** 组件宽高继承父级(填充) */
    isFill?: boolean;
  };

const restyleFunctions = [layout, backgroundColor];
const EMPTY_IMG_URL = 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1600399988378210445.png';

const Empty: React.FC<EmptyProps> = ({ children, ...restProps }) => {
  const { isEmpty, emptyText = '暂无数据', imgStyle, isFill, backgroundColor = 'emptyBgColor' } = restProps;
  const props = useRestyle(restyleFunctions, {
    style: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: isFill ? 1 : 0,
    },
    backgroundColor,
    ...restProps,
  });

  const renderEmptyDom = () => {
    if (typeof emptyText === 'string') {
      return <Text color="primaryTipColor">{emptyText}</Text>;
    }
    return emptyText;
  };

  return (
    <Box {...props}>
      {isEmpty ? (
        <Box alignItems="center">
          <Image
            style={{ width: px(140), height: px(140), ...imgStyle }}
            source={{ uri: EMPTY_IMG_URL }}
            resizeMode="contain"
          />
          {renderEmptyDom()}
        </Box>
      ) : (
        { children }
      )}
    </Box>
  );
};

export default Empty;
