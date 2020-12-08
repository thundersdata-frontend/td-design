/*
 * @文件描述: 配合react-beautiful-dnd使用的卡片组件
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-11-13 14:12:00
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-14 11:39:35
 */
import React, { CSSProperties } from 'react';
import classnames from 'classnames';

export interface CardProps {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  extra?: string | JSX.Element;
  className?: string;
  style?: CSSProperties;
}

const Card: React.FC<CardProps> = ({ title, subtitle, extra, className, style, children }) => {
  const SubTitleComp = subtitle ? <div className="td-card-header-subtitle">{subtitle}</div> : null;

  // title
  const TitleComp = (
    <div className="td-card-header-title">
      {title}
      {SubTitleComp}
    </div>
  );

  // extra
  const ExtraComp = extra ? <div className="td-card-header-extra"> {extra}</div> : null;

  return (
    <div className={classnames('td-card', className)} style={style}>
      {title && (
        <div className="td-card-header">
          {TitleComp}
          {ExtraComp}
        </div>
      )}
      <div className="td-card-body">{children}</div>
    </div>
  );
};

export default Card;
