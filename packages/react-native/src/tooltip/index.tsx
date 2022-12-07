import { useTheme } from '@shopify/restyle';
import React, { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { FlexStyle, I18nManager, Modal, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';
import { getElementVisibleWidth } from './getTooltipCoordinate';
import Triangle from './Triangle';
import useTooltip from './useTooltip';

const { deviceWidth, px } = helpers;
export interface TooltipProps {
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
  /** 是否禁用 */
  disabled?: boolean;
}

export interface TooltipRef {
  show: () => void;
  close: () => void;
}

const Tooltip = forwardRef<TooltipRef, PropsWithChildren<TooltipProps>>(
  (
    {
      title,
      backgroundColor,
      style,
      children,
      width = px(150),
      height = px(40),
      skipAndroidStatusBar = false,
      withOverlay = false,
      onVisibleChange,
      disabled = false,
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { state, xy, toggleTooltip, measureRef, visible } = useTooltip({
      skipAndroidStatusBar,
      onVisibleChange,
      width,
      height,
      ref,
    });

    const renderPointer = (tooltipY: FlexStyle['top']) => {
      const { yOffset, xOffset, elementHeight, elementWidth } = state;
      const pastMiddleLine = yOffset > (tooltipY ?? 0);

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
        backgroundColor: withOverlay ? theme.colors.mask : theme.colors.transparent,
        flex: 1,
      };
    };

    /** 渲染Tooltip */
    const renderToolTip = () => {
      const tooltipStyle: ViewStyle = StyleSheet.flatten([
        {
          position: 'absolute',
          [I18nManager.isRTL ? 'right' : 'left']: xy.x,
          top: xy.y,
          width,
          height,
          backgroundColor: backgroundColor ?? theme.colors.primary_text,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          borderRadius: px(10),
          padding: px(10),
        },
        style,
      ]);
      return (
        <TouchableOpacity style={containerStyle(withOverlay)} onPress={toggleTooltip} activeOpacity={1}>
          <View>
            {renderPointer(tooltipStyle.top)}
            <View style={tooltipStyle} testID="tooltipPopoverContainer">
              {typeof title === 'string' ? (
                <Box width={tooltipStyle.width} paddingHorizontal="x2">
                  <Text color="background">{title}</Text>
                </Box>
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
        <TouchableOpacity onPress={toggleTooltip} delayLongPress={250} activeOpacity={0.5} disabled={disabled}>
          {children}
        </TouchableOpacity>
        <Modal animationType="fade" visible={visible} transparent>
          {renderToolTip()}
        </Modal>
      </View>
    );
  }
);

export default Tooltip;
