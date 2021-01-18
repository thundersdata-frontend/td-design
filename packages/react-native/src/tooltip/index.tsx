import { useTheme } from '@shopify/restyle';
import React, { Children, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, ViewStyle, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Box from '../box';
import { Theme } from '../config/theme';
import Portal from '../portal';
import { deviceHeight, deviceWidth, px } from '../helper';

const indicatorWidth = 10;
const indicatorHeight = 10;

interface TooltipProps {
  /** 提示文字 */
  title: ReactNode;
  /** 是否显示 */
  visible?: boolean;
  /** 显示隐藏的回调 */
  onVisibleChange?: () => void;
  /** 蒙层是否允许点击关闭弹窗 */
  maskClosable?: boolean;
  /** 背景颜色 */
  color?: string;
  /** 内容显示位置。bottom在底部；center在中间；fullscreen全屏显示 */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** 指示器位置 */
  indicatorPosition?: 'start' | 'center' | 'end';
  /** 自定义样式 */
  style?: ViewStyle;
}

interface IndicatorProps {
  /** 内容显示位置。bottom在底部；center在中间；fullscreen全屏显示 */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** 背景颜色 */
  color?: string;
}

const Indicator: FC<IndicatorProps> = ({ position, color }) => {
  const theme = useTheme<Theme>();

  let style: ViewStyle;
  switch (position) {
    case 'bottom':
      style = {
        borderLeftWidth: px(5),
        borderLeftColor: theme.colors.transparent,
        borderRightWidth: px(5),
        borderRightColor: theme.colors.transparent,
        borderBottomWidth: px(10),
        borderBottomColor: color,
      };
      break;
    case 'right':
      style = {
        borderTopWidth: px(5),
        borderTopColor: theme.colors.transparent,
        borderBottomWidth: px(5),
        borderBottomColor: theme.colors.transparent,
        borderRightWidth: px(10),
        borderRightColor: color,
      };
      break;
    case 'left':
      style = {
        borderTopWidth: px(5),
        borderTopColor: theme.colors.transparent,
        borderBottomWidth: px(5),
        borderBottomColor: theme.colors.transparent,
        borderLeftWidth: px(10),
        borderLeftColor: color,
      };
      break;
    default:
      style = {
        borderLeftWidth: px(5),
        borderLeftColor: theme.colors.transparent,
        borderRightWidth: px(5),
        borderRightColor: theme.colors.transparent,
        borderTopWidth: px(10),
        borderTopColor: color,
      };
  }
  return <Box style={[{ width: 0, height: 0, opacity: 0.8 }, style]}></Box>;
};

const Tooltip: FC<TooltipProps> = ({
  title,
  position = 'bottom',
  indicatorPosition = 'center',
  color,
  style,
  children,
  maskClosable = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [contentWidth, setWidth] = useState(0);
  const childRef = useRef<TouchableOpacity>(null);
  const tipRef = useRef<View>(null);
  const measureRef = useRef<{ width: number; height: number; pageX: number; pageY?: number } | null>(null);
  const keyRef = useRef(-1);
  const theme = useTheme<Theme>();

  useEffect(() => {
    Children.map(children, child => {
      const _child = (child as unknown) as { props: { [key: string]: string | number } };
      const width = _child?.props.width && !Number.isNaN(+_child?.props.width) ? +_child?.props.width : 0;
      setWidth(width);
    });
  }, [children]);

  useEffect(() => {
    return () => {
      hide();
    };
  }, []);

  const getPositionStyle = ({ pageX = 0, contentHeight = 0, pageY = 0, tipWidth = 0, tipHeight = 0 }) => {
    let positionStyle: ViewStyle = {};
    let transform: { translateY: number }[] | { translateX: number }[] = [];
    const { top, left } = getIndicatorStyle({ pageX, contentHeight, pageY });
    switch (position) {
      case 'top':
        positionStyle = { left: left - indicatorWidth, bottom: -(top - indicatorHeight) };
        break;
      case 'bottom':
        positionStyle = { left: left - indicatorWidth, top: top + indicatorHeight };
        break;
      case 'right':
        positionStyle = { left: left + indicatorHeight, top: top };
        break;
      case 'left':
        positionStyle = { top: top, right: deviceWidth - left };
    }
    switch (indicatorPosition) {
      case 'start':
        if (position === 'left' || position === 'right') {
          transform = [{ translateY: -indicatorHeight / 2 }];
        }
        break;
      case 'center':
        if (position === 'top' || position === 'bottom') {
          transform = [{ translateX: -tipWidth / 2 + indicatorWidth + indicatorWidth / 2 }];
        } else {
          transform = [{ translateY: -tipHeight / 2 + indicatorHeight / 2 }];
        }
        break;
      case 'end':
        if (position === 'top') {
          positionStyle = {
            bottom: positionStyle.bottom,
            right: deviceWidth - left - indicatorWidth,
          };
          transform = [{ translateX: indicatorWidth }];
        }
        if (position === 'bottom') {
          positionStyle = {
            top: positionStyle.top,
            right: deviceWidth - left - indicatorWidth,
          };
          transform = [{ translateX: indicatorWidth }];
        }
        if (position === 'left') {
          positionStyle = {
            right: positionStyle.right,
            bottom: -top - indicatorHeight - indicatorHeight / 2,
          };
          transform = [{ translateY: -indicatorHeight / 2 }];
        }
        if (position === 'right') {
          positionStyle = {
            left: positionStyle.left,
            bottom: -top - indicatorHeight - indicatorHeight / 2,
          };
          transform = [{ translateY: -indicatorHeight / 2 }];
        }
        break;
    }
    return { ...positionStyle, transform: transform };
  };

  const getIndicatorStyle = ({ pageX = 0, contentHeight = 0, pageY = 0 }) => {
    let top = 0;
    let left = 0;
    switch (position) {
      case 'top':
        top = pageY - indicatorHeight;
        break;
      case 'bottom':
        top = pageY + contentHeight;
        break;
      case 'right':
        left = pageX + contentWidth;
        break;
      case 'left':
        left = pageX - indicatorHeight;
    }
    switch (indicatorPosition) {
      case 'start':
        if (position === 'top' || position === 'bottom') {
          left = pageX;
        } else {
          top = pageY;
        }
        break;
      case 'center':
        if (position === 'top' || position === 'bottom') {
          left = pageX - indicatorWidth / 2 + contentWidth / 2;
        } else {
          top = pageY + contentHeight / 2 - indicatorWidth / 2;
        }
        break;
      case 'end':
        if (position === 'top' || position === 'bottom') {
          left = pageX - indicatorWidth + contentWidth;
        } else {
          top = pageY + contentHeight - indicatorWidth;
        }
        break;
    }
    return { top, left };
  };

  /** 显示Tooltip视图 */
  const show = () => {
    if (childRef.current) {
      childRef.current.measure((_, __, width, height, pageX, pageY) => {
        if (!measureRef.current) {
          measureRef.current = {
            width,
            height,
            pageX,
            pageY,
          };
        } else {
          Object.assign(measureRef.current, {
            pageY,
          });
        }
        const content = renderToolTip();
        if (keyRef.current === -1) {
          keyRef.current = Portal.add(content);
        } else {
          Portal.update(keyRef.current, content);
        }
      });
    }
  };

  /** 关闭Tooltip视图 */
  const hide = () => {
    Portal.remove(keyRef.current);
    keyRef.current = -1;
  };

  /** 渲染Tooltip视图 */
  const renderToolTip = () => {
    const { pageX, height: contentHeight, pageY = 0 } = measureRef.current!;
    let maxWidth = deviceWidth - 40;
    if (position === 'left') {
      maxWidth = pageX - indicatorHeight - 20;
    } else if (position === 'right') {
      maxWidth = deviceWidth - pageX - contentWidth - indicatorHeight - 20;
    } else {
      if (indicatorPosition === 'start') {
        maxWidth = deviceWidth - pageX - 20;
      }
      if (indicatorPosition === 'end') {
        maxWidth = pageX + contentWidth - 20;
      }
    }

    // setTipShowWidth(contentWidth);
    const content = (
      <View>
        <View
          ref={tipRef}
          onLayout={event => {
            const { width: tipWidth, height: tipHeight } = event.nativeEvent.layout;
            const style = getPositionStyle({ pageX, contentHeight, pageY, tipWidth, tipHeight });
            tipRef.current?.setNativeProps(style);
          }}
          style={[
            style,
            {
              position: 'absolute',
              borderRadius: theme.borderRadii.base,
              zIndex: 1000,
              opacity: 0.8,
              padding: theme.spacing.s,
              backgroundColor: theme.colors.black,
            },
          ]}
        >
          {typeof title === 'string' ? (
            <Text style={{ color: theme.colors.white, maxWidth }} ellipsizeMode="clip" numberOfLines={99}>
              {title}
            </Text>
          ) : (
              title
            )}
        </View>
        <Box style={[getIndicatorStyle({ pageX, contentHeight, pageY })]}>
          <Indicator position={position} color={color} />
        </Box>
      </View>
    );

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setVisible(false);
          hide();
        }}
      >
        <Box
          style={{
            ...StyleSheet.absoluteFillObject,
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: maskClosable ? theme.colors.overlayColor : theme.colors.transparent,
          }}
        >
          {content}
        </Box>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ zIndex: 100 }}>
      <TouchableOpacity
        ref={childRef}
        style={{ zIndex: -1 }}
        activeOpacity={0.8}
        onPress={() => {
          if (!visible) {
            show();
            setVisible(true);
          } else {
            hide();
            setVisible(false);
          }
        }}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default Tooltip;
