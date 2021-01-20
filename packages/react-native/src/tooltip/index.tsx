import { useTheme } from '@shopify/restyle';
import React, { Children, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, ViewStyle, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Box from '../box';
import { Theme } from '../config/theme';
import Portal from '../portal';
import { deviceHeight, deviceWidth, px } from '../helper';

const indicatorWidth = px(10);
const indicatorHeight = px(10);

const BASE_HEADER_HEIGHT = px(161);
const BASE_CONTENT_HEIGHT = px(20);

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
  const minWidth = px(5);
  const maxWidth = px(10);
  const defaultColor = theme.colors.transparent;

  const generatorIndicator = (directionList: string[]) => {
    return {
      [`border${directionList[0]}Width`]: minWidth,
      [`border${directionList[0]}Color`]: defaultColor,
      [`border${directionList[1]}Width`]: minWidth,
      [`border${directionList[1]}Color`]: defaultColor,
      [`border${directionList[2]}Width`]: maxWidth,
      [`border${directionList[2]}Color`]: color,
    };
  };

  let style: ViewStyle;
  switch (position) {
    case 'bottom':
      style = generatorIndicator(['Left', 'Right', 'Bottom']);
      break;
    case 'right':
      style = generatorIndicator(['Top', 'Bottom', 'Right']);
      break;
    case 'left':
      style = generatorIndicator(['Top', 'Bottom', 'Left']);
      break;
    default:
      style = generatorIndicator(['Left', 'Right', 'Top']);
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
  const indicatorRef = useRef<View>(null);
  const measureRef = useRef<{ width: number; height: number; pageX: number; pageY?: number } | null>(null);
  const keyRef = useRef(-1);
  const theme = useTheme<Theme>();

  useEffect(() => {
    Children.map(children, child => {
      const _child = (child as unknown) as { props: { [key: string]: string | number } };
      const width = _child?.props.width && !Number.isNaN(+_child?.props.width) ? +_child?.props.width : 0;
      setWidth(width || BASE_CONTENT_HEIGHT);
    });
  }, [children]);

  useEffect(() => {
    return () => {
      hide();
    };
  }, []);

  const getPositionStyle = ({ position = 'top', tipWidth = 0, tipHeight = 0 }) => {
    let positionStyle: ViewStyle = {};
    let transform: { translateY: number }[] | { translateX: number }[] = [];
    const { top, left } = getIndicatorStyle(position);
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
        transform = [{ translateX: indicatorWidth }];
        const right = deviceWidth - left - indicatorWidth;
        const bottom = -top - indicatorHeight - indicatorHeight / 2;

        if (position === 'left' || position === 'right') {
          transform = [{ translateY: -indicatorHeight / 2 }];
        }
        if (position === 'top') {
          positionStyle = {
            bottom: positionStyle.bottom,
            right: right,
          };
        }
        if (position === 'bottom') {
          positionStyle = {
            top: positionStyle.top,
            right,
          };
        }
        if (position === 'left') {
          positionStyle = {
            right: positionStyle.right,
            bottom,
          };
        }
        if (position === 'right') {
          positionStyle = {
            left: positionStyle.left,
            bottom,
          };
        }
        break;
    }
    return { ...positionStyle, transform: transform };
  };

  const getIndicatorStyle = (position = 'top') => {
    const { pageX, height: contentHeight, pageY = 0 } = measureRef.current!;
    console.log(contentHeight, contentWidth);
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

  /** 位置调整和自适应 */
  const adjustPosition = () => {
    const { pageX, height: contentHeight, pageY = 0 } = measureRef.current!;

    let newPosition = position;
    if (pageY - BASE_HEADER_HEIGHT <= 0) {
      newPosition = 'bottom';
    }
    if (deviceHeight - pageY - contentHeight - BASE_HEADER_HEIGHT <= 0) {
      newPosition = 'top';
    }

    let maxWidth = deviceWidth - 40;
    if (newPosition === 'left') {
      maxWidth = pageX - indicatorHeight - 20;
    } else if (newPosition === 'right') {
      maxWidth = deviceWidth - pageX - contentWidth - indicatorHeight - 20;
    } else {
      if (indicatorPosition === 'start') {
        maxWidth = deviceWidth - pageX - 20;
      }
      if (indicatorPosition === 'end') {
        maxWidth = pageX + contentWidth - 20;
      }
    }

    return { maxWidth, newPosition };
  };

  /** 渲染Tooltip视图 */
  const renderToolTip = () => {
    const { maxWidth, newPosition } = adjustPosition();

    const content = (
      <View>
        <View
          ref={tipRef}
          onLayout={event => {
            const { width: tipWidth, height: tipHeight } = event.nativeEvent.layout;
            const style = getPositionStyle({ position: newPosition, tipWidth, tipHeight });
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
        <View ref={indicatorRef} style={[getIndicatorStyle(newPosition)]}>
          <Indicator position={newPosition} color={color} />
        </View>
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
