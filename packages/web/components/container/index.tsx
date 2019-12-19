/*
 * @文件描述: 容器组件
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-07-08 18:13:20
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-09 16:30:32
 */
import React, { CSSProperties } from 'react';
import classnames from 'classnames';

export interface ContainerProps {
  header?: string | JSX.Element;
  extra?: string | JSX.Element;
  footer?: string | JSX.Element;
  className?: string;
  style?: CSSProperties;
}
const Container: React.FC<ContainerProps> = ({ header, extra, footer, className, style, children }) => {
  // header
  const headerComp = header ? (
    <div className="td-container-header">
      <div className="td-container-header-left">{header}</div>
      {extra && <div className="td-container-header-right">{extra}</div>}
    </div>
  ) : null;

  // footer
  const footerComp = footer ? <div className="td-container-footer">{footer}</div> : null;

  return (
    <div className={classnames('td-container', className)} style={style}>
      {headerComp}
      {children}
      {footerComp}
    </div>
  );
};
export default Container;
