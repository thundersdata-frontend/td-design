import React, { cloneElement, FC, memo, ReactElement, ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Pressable from '../pressable';
import Text from '../text';
import { Spacing, Theme } from '../theme';

export interface ButtonGroupOption {
  /** 文本或者组件 */
  label: ReactNode;
  /** 按下的回调函数 */
  onPress?: () => void;
}
interface ItemProps extends ButtonGroupOption {
  /** 自定义Item样式 */
  itemStyle?: StyleProp<ViewStyle>;
  /** 尺寸 */
  size?: Spacing;
  /** 是否禁用 */
  disabled: boolean;
  /** 序号 */
  index: number;
  /** 点击事件 */
  onItemPress: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
  isCurrent: boolean;
  /** 按下时的不透明度 */
  activeOpacity?: number;
}

const ButtonItem: FC<ItemProps> = ({
  label,
  onItemPress,
  onPress,
  itemStyle,
  disabled,
  size = 'x2',
  index,
  isFirst,
  isLast,
  isCurrent,
  activeOpacity,
}) => {
  const theme = useTheme<Theme>();

  const styles = StyleSheet.create({
    item: {
      backgroundColor: isCurrent ? theme.colors.primary200 : theme.colors.white,
      borderColor: theme.colors.primary200,
      padding: theme.spacing[size],
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderRightWidth: 1,
    },
    first: {
      borderTopStartRadius: theme.borderRadii.x1,
      borderBottomStartRadius: theme.borderRadii.x1,
      borderLeftWidth: 1,
    },
    last: {
      borderTopEndRadius: theme.borderRadii.x1,
      borderBottomEndRadius: theme.borderRadii.x1,
      borderRightWidth: 1,
      borderLeftWidth: 0,
    },
  });

  const renderLabel = () => {
    const textColor = isCurrent ? theme.colors.white : theme.colors.primary200;

    if (typeof label === 'string')
      return (
        <Text
          variant={'p1'}
          textAlign={'center'}
          style={{
            color: disabled ? theme.colors.disabled : textColor,
          }}
        >
          {label}
        </Text>
      );
    return cloneElement(label as ReactElement, {
      style: {
        color: textColor,
      },
    });
  };

  if (!disabled)
    return (
      <Pressable
        activeOpacity={activeOpacity}
        onPress={() => {
          onItemPress(index);
          onPress?.();
        }}
        style={StyleSheet.flatten([styles.item, isFirst && styles.first, isLast && styles.last, itemStyle])}
      >
        {renderLabel()}
      </Pressable>
    );

  return (
    <Box style={StyleSheet.flatten([styles.item, isFirst && styles.first, isLast && styles.last, itemStyle])}>
      {renderLabel()}
    </Box>
  );
};

export default memo(ButtonItem);
