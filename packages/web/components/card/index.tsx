/*
 * @文件描述: 卡片组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-07-09 17:19:00
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-08-23 17:54:07
 */
import React from 'react';

export interface CardProps {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  extra?: string | JSX.Element;
}

const Card: React.FC<CardProps> = ({ title, subtitle, extra, children }) => {
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
    <div className="td-card">
      {' '}
      {title && (
        <div className="td-card-header">
          {' '}
          {TitleComp}
          {ExtraComp}
        </div>
      )}
      <div className="td-card-body"> {children}</div>{' '}
    </div>
  );
};

export default Card;
