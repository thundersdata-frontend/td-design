import React, { createRef, Component } from 'react';
import { findNodeHandle, PanResponder, requireNativeComponent, UIManager } from 'react-native';
import { DefaultHeader } from './DefaultHeader';

const SmartRefreshLayout = requireNativeComponent('SmartRefreshLayout');

class SmartRefreshControl extends Component<any> {
  private _panResponder: any;
  private refreshLayout = createRef<any>();

  constructor(props: any) {
    super(props);
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => {
        if (this.shiftPercent >= 0.039 || this.footerShiftPercent >= 0.068) {
          //满足条件捕获事件
          return true;
        }
        return false;
      },
    });
  }

  /**
   * 参数格式为{delayed:number,success:bool}
   * delayed:延迟刷新
   * success:是否刷新成功
   * @param params
   */
  finishRefresh = ({ delayed = -1, success = true } = { delayed: -1, success: true }) => {
    this.dispatchCommand('finishRefresh', [delayed, success]);
  };

  dispatchCommand = (commandName: string, params: any) => {
    UIManager.dispatchViewManagerCommand(
      this.findNode(),
      (UIManager.getViewManagerConfig
        ? UIManager.getViewManagerConfig('SmartRefreshLayout')
        : (UIManager as any).SmartRefreshLayout
      ).Commands[commandName],
      params
    );
  };

  findNode = () => {
    return findNodeHandle(this.refreshLayout.current);
  };

  shiftPercent = 0; //header位移百分比，默认为0

  footerShiftPercent = 0; // footer位移百分比
  /**
   * 渲染Header
   * @return {*}
   */
  renderHeader = () => {
    const { HeaderComponent, renderHeader } = this.props;
    if (renderHeader) {
      return React.isValidElement(renderHeader) ? renderHeader : renderHeader();
    }
    if (HeaderComponent) {
      return HeaderComponent;
    }
    return <DefaultHeader />;
  };
  /**
   * 刷新时触发
   * @private
   */
  _onSmartRefresh = () => {
    const { onRefresh } = this.props;
    onRefresh && onRefresh();
  };
  /**
   * 下拉过程
   * @param event
   * @private
   */
  _onHeaderPulling = (event: any) => {
    this.shiftPercent = event.nativeEvent.percent;
    const { onHeaderPulling, onHeaderMoving } = this.props;
    onHeaderMoving && onHeaderMoving(event);
    onHeaderPulling && onHeaderPulling(event);
  };
  /**
   * 释放过程
   * @param event
   * @private
   */
  _onHeaderReleasing = (event: any) => {
    this.shiftPercent = event.nativeEvent.percent;
    const { onHeaderReleasing, onHeaderMoving } = this.props;
    onHeaderMoving && onHeaderMoving(event);
    onHeaderReleasing && onHeaderReleasing(event);
  };
  /**
   * 底部位移过程
   * @param event
   * @private
   */
  _onFooterMoving = (event: any) => {
    this.footerShiftPercent = event.nativeEvent.percent;
  };

  render() {
    const nativeProps = {
      ...this.props,
      ...{
        onSmartRefresh: this._onSmartRefresh,
        onHeaderPulling: this._onHeaderPulling,
        onHeaderReleasing: this._onHeaderReleasing,
        onFooterMoving: this._onFooterMoving,
      },
    };
    return (
      <SmartRefreshLayout ref={this.refreshLayout} {...nativeProps} {...this._panResponder.panHandlers}>
        {this.renderHeader()}
        {this.props.children}
      </SmartRefreshLayout>
    );
  }
}

export default SmartRefreshControl;
