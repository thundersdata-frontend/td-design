import React, { FC } from 'react';
import { View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { getIconType } from '../helper';
import { IconType } from '../helper/getIconType';

export interface IconProps {
  /** 图标名字 */
  name: string;
  /** 图标大小 */
  size?: number;
  /** 图标颜色 */
  color?: string;
  /** 图标背景色 */
  bgColor?: string;
  /** 图标库 */
  type?: IconType;
  /** 点击事件 */
  onPress?: () => void;
  /** 长按事件 */
  onLongPress?: () => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示为圆形 */
  rounded?: boolean;
  /** 倍率 */
  ratio?: number;
}

const Icon: FC<IconProps> = props => {
  const theme = useTheme<Theme>();

  const {
    type,
    name,
    size = theme.borderRadii.icon * 2,
    color = theme.colors.primaryTextColor,
    bgColor = theme.colors.transparent,
    onPress,
    onLongPress,
    disabled = false,
    rounded = false,
    ratio = 1.5,
  } = props;

  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: bgColor,
    width: size * ratio,
    height: size * ratio,
    justifyContent: 'center',
    alignItems: 'center',
  };
  const touchableStyle: StyleProp<ViewStyle> = {
    width: size * ratio,
    height: size * ratio,
    justifyContent: 'center',
    alignItems: 'center',
  };
  /** 如果设置图标为圆形，则提供圆形的样式 */
  if (rounded) {
    Object.assign(containerStyle, { borderRadius: (size * ratio) / 2 });
    Object.assign(touchableStyle, { borderRadius: (size * ratio) / 2 });
  }
  /** 如果设置图标为disabled，降低透明度 */
  if (disabled) {
    Object.assign(containerStyle, {
      opacity: 0.4,
    });
  }

  const IconComponent = getIconType(type);
  return (
    <View style={containerStyle}>
      {onPress ? (
        <TouchableOpacity
          {...{
            onPress,
            onLongPress,
            disabled,
            activeOpacity: 0.8,
          }}
          style={touchableStyle}
        >
          <IconComponent
            {...{
              name,
              size,
              color,
            }}
          />
        </TouchableOpacity>
      ) : (
        <IconComponent
          {...{
            name,
            size,
            color,
          }}
        />
      )}
    </View>
  );
};

export default Icon;
