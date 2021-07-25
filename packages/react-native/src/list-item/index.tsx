import React, { FC, ReactNode } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle, Keyboard } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Box from '../box';
import Text from '../text';
import { Theme } from '../theme';
import Flex from '../flex';
import SvgIcon, { IconNames } from '../svg-icon';
import Image from '../image';
import helpers from '../helpers';

const { ONE_PIXEL, px } = helpers;
const THUMB_SIZE = px(36);

const iconMap: Record<string, IconNames> = {
  horizontal: 'right',
  down: 'down',
  up: 'up',
};

interface CustomItemProps {
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
  /** 高度 */
  height?: number;
  /** 自定义style  */
  style?: StyleProp<ViewStyle>;
  /** 是否必填，必填显示红色*号 */
  required?: boolean;
  /** 右侧箭头指示方向 */
  arrow?: 'horizontal' | 'down' | 'up' | 'empty';
  /** 是否折行  */
  wrap?: boolean;
  /** 子元素垂直对齐方式 */
  align?: 'flex-start' | 'center' | 'flex-end';
}

type BriefBasePropsType = Pick<CustomItemProps, 'wrap'>;

const Brief: FC<BriefBasePropsType> = props => {
  const theme = useTheme<Theme>();
  const { children, wrap } = props;
  const numberOfLines = wrap ? {} : { numberOfLines: 1 };
  return (
    <Box style={{ paddingBottom: theme.spacing.x2 }}>
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
  height = px(54),
  style,
  extra,
  arrow,
  wrap = false,
  required = false,
  align = 'center',
}: CustomItemProps) => {
  const theme = useTheme<Theme>();

  const Thumb = (
    <>
      {typeof thumb === 'string' ? (
        <Image
          source={{ uri: thumb }}
          style={[{ width: THUMB_SIZE, height: THUMB_SIZE }, wrap ? {} : { marginRight: theme.spacing.x3 }]}
        />
      ) : (
        thumb
      )}
    </>
  );

  const TitleComp = (
    <Flex flexDirection="column" alignItems="flex-start">
      {typeof title === 'string' ? (
        <Text variant="p1" color="gray500" paddingVertical="x1">
          {required ? <Text color="func600">*</Text> : null}
          {title}
        </Text>
      ) : (
        title
      )}
      {brief && <Brief wrap={wrap}>{brief}</Brief>}
    </Flex>
  );

  let Extra;
  if (extra) {
    if (typeof extra === 'string') {
      const numberOfLines = wrap ? {} : { numberOfLines: 1 };
      Extra = (
        <Box style={{ flex: 1 }}>
          <Text
            variant="p0"
            color="gray500"
            style={{
              textAlign: 'right',
              textAlignVertical: 'center',
            }}
            {...numberOfLines}
          >
            {extra}
          </Text>
        </Box>
      );
    } else {
      Extra = extra;
    }
  }

  const Arrow =
    arrow && arrow !== 'empty' ? (
      <Box style={{ marginLeft: theme.spacing.x1 }}>
        <SvgIcon name={iconMap[arrow]} color={theme.colors.icon} />
      </Box>
    ) : null;

  return (
    <Box
      backgroundColor="background"
      borderBottomWidth={ONE_PIXEL}
      borderBottomColor="border"
      paddingHorizontal="x3"
      style={[{ height }, style]}
    >
      <Flex justifyContent="space-between" alignItems={align}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={Keyboard.dismiss}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height,
          }}
        >
          {Thumb}
          {TitleComp}
        </TouchableOpacity>
        {arrow || extra ? (
          <TouchableOpacity activeOpacity={onPress ? 0.5 : 1} onPress={onPress} style={{ flex: 1 }}>
            <Flex paddingLeft="x1" flex={1} justifyContent="flex-end">
              {Extra}
              {Arrow}
            </Flex>
          </TouchableOpacity>
        ) : null}
      </Flex>
    </Box>
  );
};

export default ListItem;
