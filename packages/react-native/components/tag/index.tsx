import React, { CSSProperties, FC, useRef, useState } from 'react';
import { BackgroundColorProps, useTheme } from '@shopify/restyle';
import { View, ViewStyle, TouchableWithoutFeedback, Text, Platform, TextStyle } from 'react-native';
import { Theme } from '../config/theme';
import styles from './style/index';

type TagProps = BackgroundColorProps<Theme> & {
  size?: 'large' | 'small' | 'default';
  /**  标签的大小 */
  disabled?: boolean;
  /** 设置禁用 */
  color?: string;
  /**  指定标签颜色 */
  closable?: boolean;
  /**  可关闭 */
  checked?: boolean;
  /**  设置标签的选中状态 */
  style?: CSSProperties;
  /**  自定义样式 */
  onClose?: () => void;
  /**  点击关闭的回调函数 */
  onChange?: (selected: boolean) => void;
  /**  点击标签的回调函数 */
};

const Tag: FC<TagProps> = ({
  children,
  closable = false,
  disabled = false,
  checked = false,
  size,
  style,
  color,
  onClose,
  onChange,
}) => {
  const ref = useRef<any>();

  const [selected, setSelected] = useState(checked);
  const [closed, setClosed] = useState(true);

  const theme = useTheme<Theme>();

  const onPress = () => {
    if (disabled) {
      return;
    }
    setSelected(!selected);
    if (onChange) {
      onChange(!selected);
    }
  };

  const onTagClose = () => {
    setClosed(!closed);
    if (onClose) {
      onClose();
    }
  };

  const closeStyle = Platform.OS === 'ios' ? styles.closeIOS : styles.closeAndroid;

  const tag = {
    borderRadius: theme.borderRadii.tag,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    overflow: 'visible',
  };

  const wrap = {
    overflow: 'hidden',
    borderRadius: theme.borderRadii.tag,
    borderWidth: 0.5,
    borderStyle: 'solid',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
  };

  // 指定颜色
  const selectColor = color ? { backgroundColor: color } : {};

  // 定义点击和禁用样式
  let wrapStyle;
  let textStyle;
  if (!selected && !disabled) {
    wrapStyle = {
      borderColor: color || '#dddddd',
    };
    textStyle = {
      color: color ? '#ffffff' : '#888888',
      opacity: 100,
    };
  }
  if (selected && !disabled) {
    wrapStyle = {
      backgroundColor: theme.colors.mainBackground,
      borderColor: '#108ee9',
    };
    textStyle = {
      color: '#108ee9',
    };
  }
  if (disabled) {
    wrapStyle = {
      backgroundColor: '#dddddd',
      borderColor: '#dddddd',
    };
    textStyle = {
      color: '#bbbbbb',
    };
  }

  // 定义不同大小的样式
  let sizeWrapStyle;
  let sizeTextStyle;
  if (size === 'small') {
    sizeWrapStyle = {
      paddingVertical: 1.5,
      paddingHorizontal: theme.spacing.s,
    };
    sizeTextStyle = {
      fontSize: 10,
    };
  }
  if (size === 'large') {
    sizeWrapStyle = {
      paddingVertical: theme.spacing.m,
      paddingHorizontal: theme.spacing.l,
    };
    sizeTextStyle = {
      fontSize: 14,
    };
  }

  const closableDom =
    closable && !disabled ? (
      <TouchableWithoutFeedback onPress={() => onTagClose()}>
        <View ref={ref} style={[styles.close as ViewStyle, closeStyle as ViewStyle]}>
          <Text
            style={[
              styles.closeText as TextStyle,
              Platform.OS === 'android' ? styles.closeTransform : {},
            ]}
          >
            ×
          </Text>
        </View>
      </TouchableWithoutFeedback>
    ) : null;

  return closed ? (
    <View style={[tag as ViewStyle, style as ViewStyle]}>
      <View>
        <TouchableWithoutFeedback onPress={() => onPress()}>
          <View style={[wrap as ViewStyle, wrapStyle, sizeWrapStyle, selectColor]}>
            <Text style={[styles.text as TextStyle, textStyle, sizeTextStyle]}>{children} </Text>
          </View>
        </TouchableWithoutFeedback>
        {closableDom}
      </View>
    </View>
  ) : null;
};

export default Tag;
