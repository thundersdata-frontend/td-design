import { useTheme } from '@shopify/restyle';
import React, { FC, ReactNode } from 'react';
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

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (disabled) return;
        onPress();
      }}
      style={[
        {
          backgroundColor: disabled ? theme.colors.disabledBgColor : backgroundColor ?? theme.colors.primaryColor,
          padding: theme.spacing[size],
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        },
        style,
      ]}
    >
      {typeof label === 'string' ? (
        <Text
          style={{
            color: disabled ? theme.colors.secondaryTextColor : textColor ?? theme.colors.white,
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      ) : (
        label
      )}
    </TouchableOpacity>
  );
};

export default ButtonItem;
