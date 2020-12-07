import React, { FC, ReactNode, ReactText } from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { SIZE_TYPE } from '.';
import { theme } from '../config/theme';
import { px } from '../helper';

interface ItemProps {
  /** 显示的文本或组件 **/
  label: ReactNode;
  /**  当前值 */
  value: ReactText;
  /** 自定义Item样式 */
  style?: StyleProp<ViewStyle>;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 文本颜色 */
  textColor?: string;
  /** 尺寸 */
  size?: SIZE_TYPE;
  /** 是否禁用 */
  disabled: boolean;
  /** 点击事件 */
  onPress: (value: ReactText) => void;
}

const ButtonItem: FC<ItemProps> = ({
  label,
  value,
  onPress,
  style,
  disabled,
  size = 'm',
  backgroundColor = theme.colors.primaryColor,
  textColor = theme.colors.white,
}) => {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (disabled) return;
        onPress(value)
      }}
      style={[
        {
          backgroundColor: disabled ? theme.colors.disabledBgColor : backgroundColor,
          borderColor: theme.colors.borderColor,
          borderWidth: px(1),
          padding: theme.spacing[size],
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        },
        style]}
    >
      {typeof label === "string" ?
        <Text
          style={{
            color: disabled ? theme.colors.secondaryTextColor : textColor,
            textAlign: "center"
          }}
        >
          {label}
        </Text> :
        label
      }
    </TouchableOpacity>
  )
}

export default ButtonItem;
