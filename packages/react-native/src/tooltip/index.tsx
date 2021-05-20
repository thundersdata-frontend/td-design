import { useTheme } from '@shopify/restyle';
import React, { FC, ReactNode, useCallback, useRef, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  FlexStyle,
  I18nManager,
  StatusBar,
  Platform,
  Modal,
} from 'react-native';
import { Theme } from '../theme';
import getTooltipCoordinate, { getElementVisibleWidth } from './getTooltipCoordinate';
import Triangle from './Triangle';
import helpers from '../helpers';

const { deviceHeight, deviceWidth, isIOS, px } = helpers;
interface TooltipProps {
  /** 提示文字 */
  title: ReactNode;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 显示隐藏的回调 */
  onVisibleChange?: (visible: boolean) => void;
  /** 是否有蒙层 */
  withOverlay?: boolean;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 自定义样式 */
  style?: ViewStyle;
  /** 是否跳过安卓状态栏 */
  skipAndroidStatusBar?: boolean;
}

type TooltipState = {
  yOffset: number;
  xOffset: number;
  elementWidth: number;
  elementHeight: number;
};

const initState = {
  yOffset: 0,
  xOffset: 0,
  elementWidth: 0,
  elementHeight: 0,
};

const Tooltip: FC<TooltipProps> = ({
  title,
  backgroundColor,
  style,
  children,
  width = px(150),
  height = px(40),
  skipAndroidStatusBar = false,
  withOverlay = true,
  onVisibleChange,
}) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<TooltipState>(initState);
  const measureRef = useRef<View>(null);
  const theme = useTheme<Theme>();

  const toggleTooltip = () => {
    getElementPosition();
    setVisible(!visible);
    onVisibleChange && onVisibleChange(!visible);
  };

  const getElementPosition = useCallback(() => {
    if (measureRef.current) {
      measureRef.current.measure((_frameOffsetX, _frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
        const value: TooltipState = {
          xOffset: pageOffsetX,
          yOffset:
            isIOS || skipAndroidStatusBar
              ? pageOffsetY
              : pageOffsetY -
              Platform.select({
                android: StatusBar.currentHeight,
                ios: 20,
                default: 0,
              }),
          elementWidth: width,
          elementHeight: height,
        };
        setState(value);
      });
    }
  }, [skipAndroidStatusBar]);

  const getTooltipStyle = () => {
    const { yOffset, xOffset, elementHeight, elementWidth } = state;
    const { x, y } = getTooltipCoordinate(
      xOffset,
      yOffset,
      elementWidth,
      elementHeight,
      deviceWidth,
      deviceHeight,
      width,
      height
    );

    return StyleSheet.flatten([
      {
        position: 'absolute',
        [I18nManager.isRTL ? 'right' : 'left']: x,
        top: y,
        width,
        height,
        backgroundColor: backgroundColor || theme.colors.black,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: px(10),
        padding: px(10),
      },
      style,
    ]);
  };

  const renderPointer = (tooltipY: FlexStyle['top']) => {
    const { yOffset, xOffset, elementHeight, elementWidth } = state;
    const pastMiddleLine = yOffset > (tooltipY || 0);

    return (
      <View
        style={{
          position: 'absolute',
          top: pastMiddleLine ? yOffset - px(13) : yOffset + elementHeight - px(2),
          [I18nManager.isRTL ? 'right' : 'left']:
            xOffset + getElementVisibleWidth(elementWidth, xOffset, deviceWidth) / 2 - px(7.5),
        }}
      >
        <Triangle style={{ borderBottomColor: backgroundColor }} isDown={pastMiddleLine} />
      </View>
    );
  };

  const containerStyle = (withOverlay: boolean): ViewStyle => {
    return {
      backgroundColor: withOverlay ? theme.colors.modal_underlay : theme.colors.transparent,
      flex: 1,
    };
  };

  /** 渲染Tooltip */
  const renderToolTip = () => {
    const tooltipStyle = getTooltipStyle() as ViewStyle;
    return (
      <TouchableOpacity style={containerStyle(withOverlay)} onPress={toggleTooltip} activeOpacity={1}>
        <View>
          {renderPointer(tooltipStyle.top)}
          <View style={tooltipStyle} testID="tooltipPopoverContainer">
            {typeof title === 'string' ? (
              <Text style={{ color: theme.colors.white, width: tooltipStyle.width, paddingHorizontal: px(10) }}>
                {title}
              </Text>
            ) : (
              title
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ zIndex: 100 }} ref={measureRef}>
      <TouchableOpacity onPress={toggleTooltip} delayLongPress={250} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
      <Modal animationType="fade" visible={visible} transparent>
        {renderToolTip()}
      </Modal>
    </View>
  );
};

export default Tooltip;
