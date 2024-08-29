import React, { FC, memo, PropsWithChildren, ReactElement, ReactNode, useMemo } from 'react';
import { Keyboard, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Pressable from '../pressable';
import SvgIcon, { IconNames } from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';

const { ONE_PIXEL } = helpers;

const iconMap: Record<string, IconNames> = {
  horizontal: 'right',
  down: 'down',
  up: 'up',
};

export type ListItemProps = {
  /** 主标题  */
  title: ReactNode;
  /** 右面的文字或组件  */
  extra?: ReactNode;
  /** 主标题下面的副标题  */
  brief?: ReactNode;
  /** 缩略图  */
  thumb?: ReactElement;
  /** 按下的回调函数  */
  onPress?: () => void;
  /** 自定义style  */
  style?: StyleProp<ViewStyle>;
  /** 是否必填，必填显示红色*号 */
  required?: boolean;
  /** 右侧箭头指示方向 */
  arrow?: 'horizontal' | 'down' | 'up' | ReactNode;
  /** 是否折行  */
  wrap?: boolean;
  /** 按下时的不透明度  */
  activeOpacity?: number;
  /** 背景色 */
  backgroundColor?: string;
  /** 边框颜色 */
  borderColor?: keyof Theme['colors'];
  /** 是否显示边框 */
  bordered?: boolean;
};

const Brief: FC<PropsWithChildren<Pick<ListItemProps, 'wrap'>>> = props => {
  const { children, wrap } = props;
  const numberOfLines = wrap ? {} : { numberOfLines: 1 };
  return (
    <Box marginTop="x1">
      {typeof children === 'string' ? (
        <Text {...numberOfLines} variant="p2" color="text">
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
  backgroundColor,
  borderColor = 'border',
  bordered = true,
  style,
  extra,
  arrow,
  wrap = false,
  required = false,
  activeOpacity = 0.6,
}: ListItemProps) => {
  if (!onPress)
    return (
      <>
        <Content {...{ backgroundColor, style, required, title, brief, thumb, extra, arrow, wrap }} />
        {bordered && <Box width={'100%'} height={ONE_PIXEL} backgroundColor={borderColor} />}
      </>
    );

  return (
    <Pressable
      activeOpacity={activeOpacity}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
    >
      <Content {...{ backgroundColor, style, required, title, brief, thumb, extra, arrow, wrap }} />
      {bordered && <Box width={'100%'} height={ONE_PIXEL} backgroundColor={borderColor} />}
    </Pressable>
  );
};
ListItem.displayName = 'ListItem';

export default memo(ListItem);

const Content = ({
  backgroundColor,
  style,
  required,
  thumb,
  title,
  brief,
  wrap,
  extra,
  arrow,
}: Omit<ListItemProps, 'onPress' | 'activeOpacity'>) => {
  const theme = useTheme<Theme>();

  const Title = useMemo(
    () => (
      <Box paddingLeft={thumb ? 'x1' : 'x0'}>
        {typeof title === 'string' ? (
          <Text variant="p1" color="text" numberOfLines={1}>
            {title}
          </Text>
        ) : (
          title
        )}
      </Box>
    ),
    [thumb, title]
  );

  const Extra = useMemo(() => {
    if (!extra) return null;
    if (typeof extra === 'string') {
      const numberOfLines = wrap ? {} : { numberOfLines: 1 };
      return (
        <Text
          variant="p1"
          color="text"
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
    <Box paddingVertical="x2" paddingHorizontal={'x2'} justifyContent="center" style={[{ backgroundColor }, style]}>
      <Flex>
        <Flex flex={1}>
          <Flex marginRight={'x5'} justifyContent="center" alignItems="center">
            {required && (
              <Text variant="p1" color="func600">
                *
              </Text>
            )}
            {thumb}
            {Title}
          </Flex>
          <Box flex={1} alignItems="flex-end">
            {Extra}
          </Box>
        </Flex>
        {Arrow}
      </Flex>
      {!!brief && <Brief wrap={wrap}>{brief}</Brief>}
    </Box>
  );
};
