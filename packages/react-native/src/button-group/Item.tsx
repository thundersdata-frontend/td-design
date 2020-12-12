import { useTheme } from '@shopify/restyle';
import React, { cloneElement, FC, ReactElement, ReactNode } from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Spacing, Theme } from '../config/theme';

interface ItemProps {
  /** 显示的文本或组件 **/
  label: ReactNode;
  /** 自定义Item样式 */
  style?: StyleProp<ViewStyle>;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 文本颜色 */
  textColor?: string;
  /** 尺寸 */
  size?: Spacing;
  /** 是否禁用 */
  disabled: boolean;
  /** 点击事件 */
  onPress: () => void;
}

const ButtonItem: FC<ItemProps> = ({ label, onPress, style, disabled, size = 'm', backgroundColor, textColor }) => {
  const theme = useTheme<Theme>();

  let labelComp: ReactNode;
  if (typeof label !== 'string') {
    labelComp = cloneElement(label as ReactElement, {
      color: textColor,
      backgroundColor: backgroundColor,
    });
  }

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      onPress={() => {
        if (disabled) return;
        onPress();
      }}
      style={[
        style,
        {
          backgroundColor: backgroundColor ?? theme.colors.primaryColor,
          borderColor: theme.colors.primaryColor,
          padding: theme.spacing[size],
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        },
      ]}
    >
      {typeof label === 'string' ? (
        <Text
          style={{
            color: disabled ? theme.colors.secondaryTipColor : textColor ?? theme.colors.white,
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      ) : (
          labelComp
        )}
    </TouchableOpacity>
  );
};

export default ButtonItem;
