import React, { FC, ReactNode } from 'react';
import { Image, StyleProp, StyleSheet, TouchableHighlight, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Box from '../box';
import Text from '../text';
import { Theme } from '../config/theme';
import { px } from '../helper';
import Flex from '../flex';
import Icon from '../icon';

const THUMB_SIZE = px(36)

const iconMap = {
  horizontal: 'right',
  down: 'down',
  up: 'up',
};

interface CustomItemProps {
  /** 主标题  */
  title: ReactNode | string;
  /** 右面的文字或组件  */
  extra?: ReactNode | string;
  /** 主标题下面的副标题  */
  brief?: string | ReactNode;
  /** 缩略图  */
  thumb?: ReactNode | null;
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

interface BriefBasePropsType {
  children?: ReactNode;
  /** 是否折行  */
  wrap?: boolean;
}

const Brief: FC<BriefBasePropsType> = props => {
  const theme = useTheme<Theme>();
  const { children, wrap } = props;
  let numberOfLines = wrap ? {} : {
    numberOfLines: 1,
  };
  return (
    <Box style={{ paddingBottom: theme.spacing.s, marginTop: -theme.spacing.m }}>
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
          style={
            wrap
              ? {
                width: THUMB_SIZE,
                height: THUMB_SIZE,
              }
              : {
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                marginRight: theme.spacing.m,
              }
          }
        />
      ) : (
          thumb
        )}
    </>
  );

  const TitleComp = (
    <Flex flexDirection="column" alignItems="flex-start">
      {typeof title === 'string' ? (
        <Text variant="primaryBody">
          {required ? <Text style={{ color: theme.colors.dangerousColor }}>*</Text> : null}
          {title}
        </Text>
      ) : (
          title
        )}
      {brief && <Brief>{brief}</Brief>}
    </Flex>
  );

  let numberOfLines = wrap ? {} : {
    numberOfLines: 1,
  };

  let extraDom;
  if (extra) {
    extraDom = (
      <Box style={{ flex: 1, flexDirection: 'column' }}>
        <Text
          style={{
            color: theme.colors.primaryTipColor,
            fontSize: wrap ? px(14) : px(16),
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
        extraDom = <Box style={{ flex: 1, flexDirection: 'column' }}>{tempExtraDom}</Box>;
      } else {
        extraDom = extra;
      }
    }
  }

  const Arrow = (
    <Box>
      {arrow && arrow !== 'empty' ? (
        <Box style={{ marginLeft: theme.spacing.m, marginTop: theme.spacing.xs }}>
          <Icon name={iconMap[arrow]} color={theme.colors.primaryTipColor} />
        </Box>
      ) : null}
    </Box>
  );

  return (
    <TouchableHighlight onPress={onPress}>
      <Box
        style={[
          {
            flexGrow: 1,
            paddingLeft: theme.spacing.m,
            paddingRight: theme.spacing.m,
            backgroundColor: theme.colors.white,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.disabledBgColor,
          },
          style,
        ]}
      >
        <Flex justifyContent="space-between">
          <Box style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            {Thumb}
            {TitleComp}
          </Box>
          {arrow || extra ? (
            <Box
              style={[
                {
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingTop: theme.spacing.m,
                  paddingBottom: theme.spacing.m,
                  alignItems: align,
                  height: '100%',
                },
              ]}
            >
              {extraDom}
              {Arrow}
            </Box>
          ) : null}
        </Flex>
      </Box>
    </TouchableHighlight>
  );
};

export default ListItem;
