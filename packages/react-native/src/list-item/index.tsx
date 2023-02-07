import { BackgroundColorProps, useTheme } from '@shopify/restyle';
import React, { FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import { Keyboard, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Image from '../image';
import SvgIcon, { IconNames } from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';

const { ONE_PIXEL, px } = helpers;
const THUMB_SIZE = px(36);

const iconMap: Record<string, IconNames> = {
  horizontal: 'right',
  down: 'down',
  up: 'up',
};

export type ListItemProps = BackgroundColorProps<Theme> & {
  /** 主标题  */
  title: ReactNode;
  /** 右面的文字或组件  */
  extra?: ReactNode;
  /** 主标题下面的副标题  */
  brief?: ReactNode;
  /** 缩略图  */
  thumb?: ReactNode;
  /** 按下的回调函数  */
  onPress?: () => void;
  /** 最小高度 */
  minHeight?: number;
  /** 自定义style  */
  style?: StyleProp<ViewStyle>;
  /** 是否必填，必填显示红色*号 */
  required?: boolean;
  /** 右侧箭头指示方向 */
  arrow?: 'horizontal' | 'down' | 'up' | ReactNode;
  /** 是否折行  */
  wrap?: boolean;
};

type BriefBasePropsType = PropsWithChildren<Pick<ListItemProps, 'wrap'>>;

const Brief: FC<BriefBasePropsType> = props => {
  const { children, wrap } = props;
  const numberOfLines = wrap ? {} : { numberOfLines: 1 };
  return (
    <Box marginTop="x1">
      {typeof children === 'string' ? (
        <Text {...numberOfLines} variant="p2" color="gray300">
          {children}
        </Text>
      ) : (
        children
      )}
    </Box>
  );
};

const ListItem = ({
  title,
  brief,
  thumb,
  onPress,
  minHeight = px(32),
  backgroundColor,
  style,
  extra,
  arrow,
  wrap = false,
  required = false,
}: ListItemProps) => {
  const theme = useTheme<Theme>();

  const Thumb = useMemo(() => {
    if (!thumb) return null;
    return typeof thumb === 'string' ? (
      <Image source={{ uri: thumb }} style={[{ width: THUMB_SIZE, height: THUMB_SIZE }]} />
    ) : (
      thumb
    );
  }, [thumb]);

  const TitleComp = useMemo(
    () => (
      <Box>
        {typeof title === 'string' ? (
          <Text variant="p1" color="gray500" numberOfLines={1}>
            {title}
          </Text>
        ) : (
          title
        )}
      </Box>
    ),
    [title]
  );

  const Extra = useMemo(() => {
    if (!extra) return null;
    if (typeof extra === 'string') {
      const numberOfLines = wrap ? {} : { numberOfLines: 1 };
      return (
        <Text
          variant="p1"
          color="gray500"
          style={{
            textAlign: 'right',
            textAlignVertical: 'center',
          }}
          {...numberOfLines}
        >
          {extra}
        </Text>
      );
    }
    return extra;
  }, [extra, wrap]);

  const Arrow = useMemo(() => {
    if (!arrow) return null;
    if (typeof arrow === 'string')
      return (
        <Box>
          <SvgIcon name={iconMap[arrow]} color={theme.colors.icon} />
        </Box>
      );
    return arrow;
  }, [arrow, theme.colors.icon]);

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.5 : 1}
      onPress={() => {
        Keyboard.dismiss();
        onPress && onPress();
      }}
    >
      <Box
        borderBottomWidth={ONE_PIXEL}
        borderBottomColor="border"
        paddingVertical="x1"
        backgroundColor={backgroundColor}
        justifyContent="center"
        style={style}
      >
        <Flex minHeight={minHeight}>
          <Box flex={1}>
            <Flex>
              <Flex marginRight={'x5'} justifyContent="center" alignItems="center">
                {required ? (
                  <Text variant="p1" color="func600" marginRight={'x1'}>
                    *
                  </Text>
                ) : null}
                {Thumb}
                {TitleComp}
              </Flex>
              <Box flex={1} alignItems="flex-end">
                {Extra}
              </Box>
            </Flex>
            {brief && <Brief wrap={wrap}>{brief}</Brief>}
          </Box>
          {Arrow}
        </Flex>
      </Box>
    </TouchableOpacity>
  );
};
ListItem.displayName = 'ListItem';

export default ListItem;
