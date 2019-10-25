/*
 * @文件描述: 容器组件
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-07-08 18:13:20
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-08-23 18:55:18
 */
import React from 'react';

export interface ContainerProps {
  header?: string | JSX.Element;
  extra?: string | JSX.Element;
  footer?: string | JSX.Element;
}
const Container: React.FC<ContainerProps> = ({ header, extra, footer, children }) => {
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
    <div className="td-container">
      {headerComp}
      {children}
      {footerComp}
    </div>
  );
};
export default Container;
