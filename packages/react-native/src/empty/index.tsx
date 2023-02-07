import {
  backgroundColor,
  BackgroundColorProps,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  useRestyle,
} from '@shopify/restyle';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Svg, { Ellipse, G, Path } from 'react-native-svg';

import Text from '../text';
import { Theme } from '../theme';

type EmptyProps = BackgroundColorProps<Theme> &
  LayoutProps<Theme> & {
    /** 暂无数据的文字dom */
    emptyText?: ReactNode;
    /** 自定义img */
    customImg?: ReactNode;
  };

const restyleFunctions = composeRestyleFunctions([layout, backgroundColor]);

const Empty: React.FC<EmptyProps> = ({
  emptyText = '暂无数据',
  backgroundColor = 'background',
  flex = 1,
  customImg,
  ...boxProps
}) => {
  const props = useRestyle(restyleFunctions as any, {
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
        <Text variant="p1" color="gray500">
          {emptyText}
        </Text>
      );
    }
    return emptyText;
  };

  const renderImgDom = () => {
    if (customImg) return customImg;

    return (
      <Svg width={128} height={82} viewBox="0 0 64 41">
        <G transform="translate(0 1)" fill="none" fillRule="evenodd">
          <Ellipse fill="#f5f5f5" cx={32} cy={33} rx={32} ry={7} />
          <G stroke="#d9d9d9">
            <Path d="M55 12.76 44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
            <Path
              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
              fill="#fafafa"
            />
          </G>
        </G>
      </Svg>
    );
  };

  return (
    <View {...props}>
      {renderImgDom()}
      {renderTextDom()}
    </View>
  );
};
Empty.displayName = 'Empty';

export default Empty;
