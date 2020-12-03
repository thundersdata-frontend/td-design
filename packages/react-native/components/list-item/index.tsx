import React, { FC, ReactNode } from 'react';
import { Image, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Box from '../box';
import Text from '../text';
import { Theme } from '../config/theme';
import { px } from '../helper';
import Flex from '../flex';
import Icon from '../icon';
import { ONE_PIXEL } from '../helper';

const THUMB_SIZE = px(36);

const iconMap = {
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
    <Box style={{ paddingBottom: theme.spacing.s }}>
      <Text {...numberOfLines} style={{ color: theme.colors.primaryTipColor, fontSize: px(12) }}>
        {children}
      </Text>
    </Box>
  );
};

const ListItem = ({
  title,
  brief,
  thumb,
  onPress,
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
          style={[{ width: THUMB_SIZE, height: THUMB_SIZE }, wrap ? {} : { marginRight: theme.spacing.m }]}
        />
      ) : (
        thumb
      )}
    </>
  );

  const TitleComp = (
    <Flex flexDirection="column" alignItems="flex-start" flex={1}>
      {typeof title === 'string' ? (
        <Text variant="primaryBody" style={{ paddingVertical: theme.spacing.xs }}>
          {required ? <Text style={{ color: theme.colors.dangerousColor }}>*</Text> : null}
          {title}
        </Text>
      ) : (
        title
      )}
      {brief && <Brief wrap={wrap}>{brief}</Brief>}
    </Flex>
  );

  const numberOfLines = wrap ? {} : { numberOfLines: 1 };
  let extraDom;
  if (extra) {
    extraDom = (
      <Box style={{ flex: 1 }}>
        <Text
          style={{
            color: theme.colors.primaryTipColor,
            fontSize: px(16),
            textAlign: 'right',
            textAlignVertical: 'center',
          }}
          {...numberOfLines}
        >
          {extra}
        </Text>
      </Box>
    );

    if (React.isValidElement(extra)) {
      const extraChildren = (extra.props as any).children;
      if (Array.isArray(extraChildren)) {
        const tempExtraDom: any[] = [];
        extraChildren.forEach((el, index) => {
          if (typeof el === 'string') {
            tempExtraDom.push(
              <Text
                {...numberOfLines}
                style={{
                  color: theme.colors.primaryTipColor,
                  fontSize: px(16),
                  textAlign: 'right',
                  textAlignVertical: 'center',
                }}
                key={`${index}-children`}
              >
                {el}
              </Text>
            );
          } else {
            tempExtraDom.push(el);
          }
        });
        extraDom = <Box style={{ flex: 1 }}>{tempExtraDom}</Box>;
      } else {
        extraDom = extra;
      }
    }
  }

  const Arrow =
    arrow && arrow !== 'empty' ? (
      <Box style={{ marginLeft: theme.spacing.xs }}>
        <Icon name={iconMap[arrow]} color={theme.colors.primaryTipColor} />
      </Box>
    ) : null;

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
      style={[
        {
          flexGrow: 1,
          backgroundColor: theme.colors.white,
          borderBottomWidth: ONE_PIXEL,
          borderBottomColor: theme.colors.disabledBgColor,
          minHeight: px(40),
        },
        style,
      ]}
    >
      <Flex justifyContent="space-between" alignItems={align}>
        {Thumb}
        {TitleComp}
        {arrow || extra ? (
          <Flex paddingVertical="m" paddingLeft="xs" flex={1} justifyContent="flex-end">
            {extraDom}
            {Arrow}
          </Flex>
        ) : null}
      </Flex>
    </TouchableOpacity>
  );
};

export default ListItem;
