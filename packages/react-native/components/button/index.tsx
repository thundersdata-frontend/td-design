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
  color as reColor,
  backgroundColor as reBackgroundColor,
  layout,
  border,
  SpacingProps,
  useRestyle,
  BorderProps,
  ColorProps,
  createRestyleComponent,
  VariantProps,
  createVariant,
  useTheme,
  LayoutProps,
} from '@shopify/restyle';
import { generate } from '@ant-design/colors';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import { useTransition } from 'react-native-redash';
import { Easing } from 'react-native-reanimated';
import { useImmer } from 'use-immer';
import { Theme, Text, Flex } from '..';
import { px } from '../helper';
import Ripple from './ripple';
import Loading from './loading';

const restyleFunctions = [spacing, border, layout, reBackgroundColor, reColor];

type CustomBackgroundColorType = keyof Theme['colors'] | [keyof Theme['colors'], keyof Theme['colors']];

export type ButtonType = 'default' | 'primary' | 'ripple' | 'link' | 'text';

export type ButtonProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  ColorProps<Theme> &
  TouchableHighlightProps & {
    /** 按钮文字内容 */
    title?: React.ReactNode;
    /** 按钮展示类型 */
    type?: ButtonType;
    /** 按钮失效状态 */
    disabled?: boolean;
    /** 是否加载中 */
    loading?: boolean;
    /** 点击按钮时的回调 */
    onPress?: (ref: ReactNode) => void;
    /** 按钮的大小 */
    size?: 'large' | 'middle' | 'small';
    /** 按钮的形状 */
    shape?: 'round' | 'default';
    /** 按钮背景色 */
    backgroundColor?: CustomBackgroundColorType;
    /** 渐变自定义属性 */
    linearGradientProps?: Partial<LinearGradientProps>;
  };

// 初始化按钮点击事件
const INITIAL_BUTTON_PROPS = {
  left: 0,
  top: 0,
  isSpawned: false,
};

const Button: FC<ButtonProps> = ({
  onPress = () => {},
  title,
  type = 'default',
  backgroundColor,
  activeOpacity = 0.3,
  children,
  size = 'middle',
  shape = 'default',
  color,
  disabled = false,
  loading = false,
  borderColor,
  linearGradientProps,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const [buttonProps, setButtonProps] = useImmer(INITIAL_BUTTON_PROPS);
  // ripple 是否触发
  const { isSpawned } = buttonProps;
  const rippleTransition = useTransition(isSpawned, { duration: 1000, easing: Easing['inOut'](Easing.ease) });
  // 是否为渐变色
  const isLinear = Array.isArray(backgroundColor) && ['primary', 'ripple'].includes(type);
  /** 集成 TouchableHighlight 和 size variants 属性的 BaseBtn 组件 */
  const BaseBtn = createRestyleComponent<
    VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof TouchableHighlight> & { children?: ReactNode },
    Theme
  >([createVariant({ themeKey: 'buttonVariants' })], TouchableHighlight);

  /** 集成 LinearGradient 和 Layout 属性的 BaseLinear 组件 */
  const BaseLinear = createRestyleComponent<
    LayoutProps<Theme> & React.ComponentProps<typeof LinearGradient> & { children?: ReactNode },
    Theme
  >([], LinearGradient);
  // 背景颜色为数组时获取第一个背景颜色
  const singleBackgroundColor = Array.isArray(backgroundColor) ? backgroundColor[0] : backgroundColor;

  /** 计算得到点击/禁用的按钮颜色 */
  const getCalcColor = (colorName: string, type: 'disabled' | 'pressed' | 'default') => {
    const color = theme.colors[colorName];
    // 计算按钮颜色
    const colors = color ? generate(color) : [];
    if (type === 'default' || colorName === 'transparent') {
      return color;
    }
    return colors[type === 'pressed' ? 6 : 2] || color;
  };

  /** 获得按钮按下后的颜色 */
  const getUnderlayColor = () => {
    let newBackgroundColor = singleBackgroundColor || 'transparent';
    switch (type) {
      case 'default':
        newBackgroundColor = singleBackgroundColor || 'white';
        break;
      case 'primary':
        newBackgroundColor = singleBackgroundColor || 'primaryColor';
        break;
      case 'ripple':
        return theme.colors[singleBackgroundColor || 'primaryColor'];
      default:
        break;
    }
    if (loading) {
      return newBackgroundColor;
    }
    if (isLinear) {
      return theme.colors.black;
    }
    return getCalcColor(newBackgroundColor, 'pressed');
  };

  /** 获得默认 button 文字颜色 */
  const getTitleColor = () => {
    let colorName = 'primaryColor';
    if (['primary', 'ripple'].includes(type)) {
      colorName = 'white';
    }
    if (type === 'text') {
      colorName = 'primaryTipColor';
    }
    return getCalcColor(color?.toString() || colorName, loading || disabled ? 'disabled' : 'default');
  };

  /** 获得按钮容器属性 */
  const getContainerProps = () => {
    const containerProps: StyleProp<ViewStyle> = {};
    let newActiveOpacity = activeOpacity;
    if (isLinear) {
      newActiveOpacity = 0.8;
    }
    if (loading || ['primary', 'ripple', 'default'].includes(type)) {
      newActiveOpacity = 1;
    }
    Object.assign(containerProps, {
      ...restProps,
      variant: size,
      disabled,
      onPressIn: (event: GestureResponderEvent) => {
        // 水波纹类型用 onPressIn 事件防止点击失效
        if (type === 'ripple' && !loading) {
          onPress && onPress(event);
          event.persist();
          console.log('event.nativeEvent?.locationX: ', event.nativeEvent?.locationX);
          setButtonProps(config => {
            config.left = event.nativeEvent?.locationX || INITIAL_BUTTON_PROPS.left;
            config.top = event.nativeEvent?.locationY || INITIAL_BUTTON_PROPS.top;
            config.isSpawned = !config.isSpawned;
          });
        }
      },
      onPress: (event: GestureResponderEvent) => {
        if (type !== 'ripple' && !loading) {
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
        borderColor: getCalcColor(borderColor?.toString() || 'primaryColor', disabled ? 'disabled' : 'default'),
      });
    }
    if (['primary', 'ripple'].includes(type)) {
      newBackgroundColor = singleBackgroundColor || 'primaryColor';
    }
    Object.assign(styleProps, {
      height: px(44),
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
    // 获得 button text 文本内容
    const getContentText = () => {
      // 如果 title 不为 string 返回 title
      if (title && typeof title !== 'string') {
        return title;
      }
      // 如果 children 不为 string 返回 children
      if (!title && children && typeof children !== 'string') {
        return children;
      }
      return (
        <Text fontSize={16} style={{ color: getTitleColor() }}>
          {title || children}
        </Text>
      );
    };

    // 获得包含 Ripple 的内容
    const getContent = () => (
      <Flex alignItems="center">
        {type === 'ripple' && (
          <Ripple
            buttonProps={buttonProps}
            transition={rippleTransition}
            isSpawned={isSpawned}
            setIsSpawned={(isSpawned: boolean) => {
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
          getCalcColor(backgroundColor![0], disabled ? 'disabled' : 'default'),
          getCalcColor(backgroundColor![1], disabled ? 'disabled' : 'default'),
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

  return <BaseBtn {...props}>{renderTitle()}</BaseBtn>;
};

export default Button;
