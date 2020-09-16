import React, { FC } from 'react';
import {
  TouchableHighlight,
  View,
  Platform,
  TouchableNativeFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Color from 'color';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { getIconType } from '../helper';
import { IconType } from '../helper/getIconType';

interface IconProps {
  /** 图标名字 */
  name: string;
  /** 图标大小 */
  size?: number;
  /** 图标颜色 */
  color: string;
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
  /** 是否显示阴影效果 */
  shadow?: boolean;
}

const Icon: FC<IconProps> = (props) => {
  const theme = useTheme<Theme>();

  const {
    type,
    name,
    size = theme.borderRadii.icon * 2,
    color,
    onPress,
    onLongPress,
    disabled = false,
    rounded = false,
    shadow = false,
  } = props;

  const roundStyle: StyleProp<ViewStyle> = {
    width: size * 1.5,
    height: size * 1.5,
    borderRadius: (size * 1.5) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color,
  };

  const containerStyle: StyleProp<ViewStyle> = {};
  /** 如果设置图标为圆形，则提供圆形的样式如下，同时设置背景色为传入的颜色，图标颜色设为白色 */
  if (rounded) {
    Object.assign(containerStyle, roundStyle);

    /** 如果设置图标为disabled，降低透明度。disabled属性仅在圆形图标下生效 */
    if (disabled) {
      Object.assign(containerStyle, {
        opacity: 0.4,
      });
    }
  }
  if (shadow) {
    Object.assign(containerStyle, {
      ...Platform.select({
        android: {
          elevation: 2,
        },
        default: {
          shadowColor: theme.colors.black,
          shadowOffset: { height: 1, width: 1 },
          shadowOpacity: 1,
          shadowRadius: 1,
        },
      }),
    });
  }

  const touchableStyle: StyleProp<ViewStyle> = { ...roundStyle };
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    Object.assign(touchableStyle, {
      backgroundColor: TouchableNativeFeedback.Ripple(Color(color).alpha(0.2).rgb().string(), true),
    });
  }

  const IconComponent = getIconType(type);
  return (
    <View style={containerStyle}>
      {onPress ? (
        <TouchableHighlight
          {...{
            onPress,
            onLongPress,
            disabled,
            underlayColor: color,
            activeOpacity: 0.3,
          }}
          style={touchableStyle}
        >
          <IconComponent
            {...{
              name,
              size,
              color: rounded ? theme.colors.white : color,
            }}
          />
        </TouchableHighlight>
      ) : (
        <IconComponent
          {...{
            name,
            size,
            color: rounded ? theme.colors.white : color,
          }}
        />
      )}
    </View>
  );
};

export default Icon;
