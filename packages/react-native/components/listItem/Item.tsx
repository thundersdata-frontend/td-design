import { useTheme } from '@shopify/restyle';
import React, { FC, ReactNode } from 'react';
import { GestureResponderEvent, Image, StyleProp, StyleSheet, Text, TouchableHighlight, ViewStyle } from 'react-native';
import Icon from '../icon';

import Box from '../box';
import { Theme } from '../config/theme';
import { px } from '../helper';

export interface ListItemPropsType {
  /** 子元素垂直对齐方式 */
  align?: 'top' | 'middle' | 'bottom';
  /** 是否禁用 */
  disabled?: boolean;
  /** 显示多行，与wrap搭配使用 */
  multipleLine?: boolean;
  /** 子元素 */
  children?: ReactNode;
  /** 缩略图 */
  thumb?: ReactNode | null;
  /** 右面的文字或组件 */
  extra?: ReactNode;
  /** 右侧箭头指示方向 */
  arrow?: 'horizontal' | 'down' | 'up' | 'empty' | '';
  /** 是否折行 */
  wrap?: boolean;
  /** 活跃状态样式 */
  activeStyle?: StyleProp<ViewStyle>;
  /** 是否处于error状态 */
  error?: boolean;
  /** 运行环境 */
  platform?: 'android' | 'ios';
}

interface ListItemProps extends ListItemPropsType {
  /** 点击事件 */
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  delayLongPress?: number;
  /** 长按事件 */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** 自定义样式  */
  style?: StyleProp<ViewStyle>;
  /** 是否折行  */
  wrap?: boolean;
  /** 显示多行，与wrap搭配使用  */
  multipleLine?: boolean;
  /** 缩略图  */
  thumb?: ReactNode | null;
}

const Item: FC<ListItemProps> = props => {
  const {
    children,
    multipleLine,
    thumb,
    extra,
    arrow,
    style,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
    wrap,
    ...restProps
  } = props;

  const theme = useTheme<Theme>();
  const itemStyles = StyleSheet.create({
    column: {
      flex: 1,
      flexDirection: 'column',
    },
    Arrow: {
      marginLeft: theme.spacing.m,
      marginTop: theme.spacing.xs,
    },
    Content: {
      color: theme.colors.black,
      fontSize: px(16),
      textAlignVertical: 'center',
    },
    Extra: {
      color: theme.colors.primaryTipColor,
      fontSize: px(16),
      textAlign: 'right',
      textAlignVertical: 'center',
    },
    MultiExtra: {
      color: theme.colors.primaryTipColor,
      fontSize: px(14),
      textAlign: 'right',
      textAlignVertical: 'center',
    },
    Item: {
      flexGrow: 1,
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: theme.spacing.l,
      backgroundColor: theme.colors.white,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.disabledBgColor,
    },
    Thumb: {
      width: px(36),
      height: px(36),
      marginRight: theme.spacing.m,
    },
    multipleThumb: {
      width: px(36),
      height: px(36),
    },
    Line: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: theme.spacing.l,
      paddingVertical: theme.spacing.m,
      minHeight: px(44),
    },
    multipleLine: {
      paddingVertical: theme.spacing.m,
    },
  });

  const Content = () => {
    let numberOfLines = {};
    if (wrap === false) {
      numberOfLines = {
        numberOfLines: 1,
      };
    }

    const underlayColor = { activeOpacity: 1 };

    let contentDom;
    if (Array.isArray(children)) {
      const tempContentDom: any[] = [];
      children.forEach((el, index) => {
        if (React.isValidElement(el)) {
          tempContentDom.push(el);
        } else {
          tempContentDom.push(
            <Text style={[itemStyles.Content]} {...numberOfLines} key={`${index}-children`}>
              {el}
            </Text>
          );
        }
      });
      contentDom = <Box style={[itemStyles.column]}>{tempContentDom}</Box>;
    } else {
      contentDom = (
        <Box style={[itemStyles.column]}>
          <Text style={[itemStyles.Content]} {...numberOfLines}>
            {children}
          </Text>
        </Box>
      );
      if (children && React.isValidElement(children)) {
        contentDom = <Box style={[itemStyles.column]}>{children}</Box>;
      }
    }

    let extraDom;
    if (extra) {
      extraDom = (
        <Box style={[itemStyles.column]}>
          <Text style={[multipleLine ? itemStyles.MultiExtra : itemStyles.Extra]} {...numberOfLines}>
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
                <Text {...numberOfLines} style={[itemStyles.Extra]} key={`${index}-children`}>
                  {el}
                </Text>
              );
            } else {
              tempExtraDom.push(el);
            }
          });
          extraDom = <Box style={[itemStyles.column]}>{tempExtraDom}</Box>;
        } else {
          extraDom = extra;
        }
      }
    }

    const itemBox = (
      <Box {...restProps} style={[itemStyles.Item, style]}>
        {typeof thumb === 'string' ? (
          <Image source={{ uri: thumb }} style={[itemStyles.Thumb, multipleLine && itemStyles.multipleThumb]} />
        ) : (
          thumb
        )}
        <Box style={[itemStyles.Line, multipleLine && itemStyles.multipleLine]}>
          {contentDom}
          {extraDom}
          {arrow ? (
            <Box style={itemStyles.Arrow}>
              <Icon name="right" color={theme.colors.primaryTipColor} />
            </Box>
          ) : null}
        </Box>
      </Box>
    );

    return (
      <TouchableHighlight
        {...underlayColor}
        onPress={(props as any).onClick ? (props as any).onClick : onPress || undefined}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress}
      >
        {itemBox}
      </TouchableHighlight>
    );
  };

  return (
    <Box>
      <Content />
    </Box>
  );
};

export default Item;
