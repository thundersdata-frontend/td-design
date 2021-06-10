import React, { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import { findNodeHandle, PanResponder, processColor, requireNativeComponent, UIManager, ViewProps } from 'react-native';
import DefaultHeader from './DefaultHeader';

interface Event {
  nativeEvent: {
    percent: number;
    offset: number;
    headerHeight: number;
  };
}

interface SmartRefreshControlProps extends ViewProps {
  /** 设置刷新组件的主调色 */
  primaryColor?: string;
  /** 是否启用下拉刷新 */
  enableRefresh?: boolean;
  /** 设定header的高度 */
  headerHeight?: number;
  /** 是否自动刷新 */
  autoRefresh?: {
    /** 是否刷新 */
    refresh: boolean;
    /** 延迟time毫秒后自动刷新 */
    time: number;
  };
  /** 是否启用纯滚动 */
  pureScroll?: boolean;
  /** 是否允许越界回弹 */
  overScrollBounce?: boolean;
  /** 是否启用越界拖动，类似IOS样式 */
  overScrollDrag?: boolean;
  /** 设置组件下拉高度与手指真实下拉高度的比值 */
  dragRate?: number;
  /** 设置最大显示下拉高度与header标准高度的比值 */
  maxDragRate?: number;
  /** 用于渲染SmartRefreshLayout组件的header,默认为DefaultHeader */
  HeaderComponent?: ReactNode;
  /** 用于渲染SmartRefreshLayout组件的header,默认为DefaultHeader */
  renderHeader?: () => ReactNode;
  /** 可下拉刷新时触发 */
  onPullDownToRefresh?: () => void;
  /** 可释放刷新时触发 */
  onReleaseToRefresh?: () => void;
  /** 刷新时触发 */
  onRefresh?: () => void;
  /** Header释放时触发 */
  onHeaderReleased?: () => void;
  /** header下拉过程中触发 */
  onHeaderPulling?: (event: Event) => void;
  /** header释放过程中触发 */
  onHeaderReleasing?: (event: Event) => void;
  /** header移动过程中触发,包括下拉过程和释放过程 */
  onHeaderMoving?: (event: Event) => void;
}

const RCTSmartRefreshLayout = requireNativeComponent('SmartRefreshLayout');

const SmartRefreshControl = forwardRef<{}, SmartRefreshControlProps>(
  (
    {
      children,
      primaryColor,
      onRefresh,
      onHeaderMoving,
      onHeaderPulling,
      onHeaderReleasing,
      renderHeader: renderCustomHeader,
      HeaderComponent,
      ...props
    },
    ref
  ) => {
    const shiftPercent = useRef<number>(0); // header位移百分比，默认为0
    const footerShiftPercent = useRef<number>(0); // footer位移百分比
    const refreshLayout = useRef(null);
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture() {
        if (shiftPercent.current >= 0.039 || footerShiftPercent.current >= 0.068) {
          return true;
        }
        return false;
      },
    });

    useImperativeHandle(ref, () => {
      return {
        finishRefresh,
      };
    });

    const finishRefresh = ({ delayed = -1, success = true } = { delayed: -1, success: true }) => {
      dispatchCommand('finishRefresh', [delayed, success]);
    };

    const dispatchCommand = (commandName: string, params: any) => {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(refreshLayout.current!),
        UIManager.getViewManagerConfig('SmartRefreshLayout').Commands[commandName],
        params
      );
    };

    /**
     * 开始刷新
     */
    const handleSmartRefresh = () => {
      onRefresh?.();
    };

    /**
     * 下拉过程
     */
    const handleHeaderPulling = (event: Event) => {
      shiftPercent.current = event.nativeEvent.percent;
      onHeaderMoving?.(event);
      onHeaderPulling?.(event);
    };

    /**
     * 释放过程
     */
    const handleHeaderReleasing = (event: Event) => {
      shiftPercent.current = event.nativeEvent.percent;
      onHeaderMoving?.(event);
      onHeaderReleasing?.(event);
    };

    /**
     * 底部位移过程
     */
    const handleFooterMoving = (event: Event) => {
      footerShiftPercent.current = event.nativeEvent.percent;
    };

    const renderHeader = () => {
      if (renderCustomHeader) return renderCustomHeader();
      if (HeaderComponent) return HeaderComponent;
      return <DefaultHeader />;
    };

    const nativeProps = {
      ...props,
      ...{
        onSmartRefresh: handleSmartRefresh,
        onHeaderPulling: handleHeaderPulling,
        onHeaderReleasing: handleHeaderReleasing,
        onFooterMoving: handleFooterMoving,
        primaryColor: processColor(primaryColor),
      },
    };
    return (
      <RCTSmartRefreshLayout ref={refreshLayout} {...nativeProps} {...panResponder.panHandlers}>
        {renderHeader()}
        {children}
      </RCTSmartRefreshLayout>
    );
  }
);

SmartRefreshControl.defaultProps = {
  overScrollBounce: false,
  enableRefresh: true,
  dragRate: 0.5,
  maxDragRate: 2.0,
};

export default SmartRefreshControl;
