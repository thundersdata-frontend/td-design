import React, { FC, ReactNode } from 'react';
import {
  TouchableHighlight,
  TouchableHighlightProps,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
  View,
} from 'react-native';
import {
  spacing,
  layout,
  border,
  SpacingProps,
  useRestyle,
  BorderProps,
  createRestyleComponent,
  useTheme,
  LayoutProps,
} from '@shopify/restyle';
import { generate } from '@ant-design/colors';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import { useImmer } from 'use-immer';
import { Theme, Text, Flex } from '..';
import { px } from '../helper';
import Ripple from './ripple';
import Loading from './loading';

const restyleFunctions = [spacing, border, layout];

export type ButtonType = 'default' | 'primary' | 'link' | 'text';

export type ButtonProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  TouchableHighlightProps & {
    /** 按钮文字内容 */
    title: React.ReactNode;
    /** 按钮展示类型 */
    type?: ButtonType;
    /** 按钮失效状态 */
    disabled?: boolean;
    /** 是否加载中 */
    loading?: boolean;
    /** 点击按钮时的回调 */
    onPress: () => void;
    /** 按钮的大小 */
    size?: 'large' | 'middle' | 'small';
    /** 按钮的形状 */
    shape?: 'round' | 'default';
    /** 按钮背景色 */
    backgroundColor?: string | [string, string];
    /** 字体颜色 */
    color?: string;
    /** 是否启用水波纹 */
    ripple?: boolean;
    /** 渐变自定义属性 */
    linearGradientProps?: Partial<LinearGradientProps>;
  };

// 初始化按钮点击事件
const INITIAL_BUTTON_PROPS = {
  left: 0,
  top: 0,
  isSpawned: 0,
};

// 按钮宽度
const BUTTON_WIDTH = {
  /** 大按钮 */
  large: '100%',
  /** 中按钮 */
  middle: '50%',
  /** 小按钮 */
  small: '25%',
  /** 文本按钮 */
  text: 'auto',
};

const Button: FC<ButtonProps> = ({
  onPress,
  title,
  type = 'default',
  backgroundColor,
  activeOpacity = 0.3,
  size = 'middle',
  shape = 'default',
  color,
  disabled = false,
  loading = false,
  ripple = false,
  borderColor,
  linearGradientProps,
  children,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  // 主色
  const primaryColor = theme.colors.primaryColor;
  const [buttonProps, setButtonProps] = useImmer(INITIAL_BUTTON_PROPS);
  // 是否为 text 元素（不设定宽高）
  const isText = ['link', 'text'].includes(type);
  // 是否使用 primary 样式
  const isPrimary = type === 'primary';
  // 是否为渐变色
  const isLinear = Array.isArray(backgroundColor) && isPrimary;

  /** 集成 LinearGradient 和 Layout 属性的 BaseLinear 组件 */
  const BaseLinear = createRestyleComponent<
    LayoutProps<Theme> & React.ComponentProps<typeof LinearGradient> & { children?: ReactNode },
    Theme
  >([], LinearGradient);
  // 背景颜色为数组时获取第一个背景颜色
  const singleBackgroundColor = Array.isArray(backgroundColor) ? backgroundColor[0] : backgroundColor;

  /** 获得按钮按下后的颜色 */
  const getUnderlayColor = () => {
    let newBackgroundColor = singleBackgroundColor || 'transparent';
    switch (type) {
      case 'default':
        if (loading) {
          return newBackgroundColor;
        }
        return singleBackgroundColor || theme.colors.btnCoverColor;
      case 'primary':
        newBackgroundColor = singleBackgroundColor || primaryColor;
        break;
      default:
        break;
    }
    if (ripple) {
      return singleBackgroundColor || primaryColor;
    }
    if (loading) {
      return newBackgroundColor;
    }
    if (isLinear) {
      return theme.colors.black;
    }
    return getCalcColor(newBackgroundColor, 'pressed');
  };

  /** 获得按钮容器属性 */
  const getContainerProps = () => {
    const containerProps: StyleProp<ViewStyle> = {};
    let newActiveOpacity = activeOpacity;
    if (['primary', 'ripple', 'default'].includes(type)) {
      newActiveOpacity = 1;
    }
    if (isLinear) {
      newActiveOpacity = 0.8;
    }
    if (loading) {
      newActiveOpacity = 1;
    }
    Object.assign(containerProps, {
      ...restProps,
      disabled,
      onPressIn: (event: GestureResponderEvent) => {
        // 水波纹类型用 onPressIn 事件防止点击失效
        if (ripple && !loading) {
          onPress && onPress(event);
          event.persist();
          setButtonProps(config => {
            config.left = event.nativeEvent?.locationX || INITIAL_BUTTON_PROPS.left;
            config.top = event.nativeEvent?.locationY || INITIAL_BUTTON_PROPS.top;
            config.isSpawned = 1;
          });
        }
      },
      onPress: (event: GestureResponderEvent) => {
        if (!ripple && !loading) {
          onPress && onPress(event);
        }
      },
      activeOpacity: newActiveOpacity,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: shape === 'default' ? 'defaultButton' : 'roundedButton',
      underlayColor: getUnderlayColor(),
    });
    return containerProps;
  };

  /** 获得容器样式 */
  const getContainerStyles = () => {
    let newBackgroundColor = singleBackgroundColor || 'transparent';
    const styleProps = {};
    if (type === 'default') {
      Object.assign(styleProps, {
        borderWidth: px(1),
        borderColor: getCalcColor(borderColor?.toString() || primaryColor, disabled ? 'disabled' : 'default'),
      });
    }
    if (isPrimary) {
      newBackgroundColor = singleBackgroundColor || primaryColor;
    }
    Object.assign(styleProps, {
      height: isText ? 'auto' : px(44),
      width: BUTTON_WIDTH[isText ? 'text' : size],
      overflow: 'hidden',
      backgroundColor: getCalcColor(newBackgroundColor, disabled ? 'disabled' : 'default'),
    });
    return styleProps;
  };

  /** 容器属性 */
  const props = useRestyle(restyleFunctions, {
    ...getContainerProps(),
    style: getContainerStyles(),
  });

  /** 渲染 button 内容 */
  const renderTitle = () => {
    const [firstColor, secondColor] = backgroundColor || [];
    /** 获得默认 button 文字颜色 */
    const getTitleColor = () => {
      let fontColor = primaryColor;
      if (isPrimary) {
        fontColor = theme.colors.white;
      }
      if (type === 'text') {
        fontColor = theme.colors.primaryTipColor;
      }
      return getCalcColor(color || fontColor, disabled ? 'disabled' : 'default');
    };
    // 获得 button text 文本内容
    const getContentText = () => {
      // 如果 title 不为 string 返回 title
      if (title && typeof title !== 'string') {
        return title;
      }
      return (
        <Text fontSize={16} style={{ color: getTitleColor() }}>
          {title}
        </Text>
      );
    };

    // 获得包含 Ripple 的内容
    const getContent = () => (
      <Flex alignItems="center">
        {ripple && (
          <Ripple
            buttonProps={buttonProps}
            setIsSpawned={isSpawned => {
              setButtonProps(config => {
                config.isSpawned = isSpawned;
              });
            }}
          />
        )}
        <Loading type={type} loading={loading} />
        {getContentText()}
      </Flex>
    );

    return isLinear ? (
      <BaseLinear
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={[
          getCalcColor(firstColor, disabled ? 'disabled' : 'default'),
          getCalcColor(secondColor || firstColor, disabled ? 'disabled' : 'default'),
        ]}
        justifyContent="center"
        alignItems="center"
        {...linearGradientProps}
        style={{ width: '100%', height: '100%' }}
      >
        {getContent()}
      </BaseLinear>
    ) : (
      <View>{getContent()}</View>
    );
  };

  return <TouchableHighlight {...props}>{renderTitle()}</TouchableHighlight>;
};

export default Button;

/** 计算得到点击/禁用的按钮颜色 */
const getCalcColor = (color: string, type: 'disabled' | 'pressed' | 'default') => {
  // 计算按钮颜色
  const colors = color ? generate(color) : [];
  if (type === 'default' || color === 'transparent') {
    return color;
  }
  return colors[type === 'pressed' ? 6 : 2] || color;
};
