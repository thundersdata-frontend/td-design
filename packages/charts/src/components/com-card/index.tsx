/*
 * @文件描述: 大屏卡片组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-09-18 15:47:00
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-15 10:05:51
 */
import React, { CSSProperties } from 'react';
import classnames from 'classnames';

interface ComCardProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  extra?: string | React.ReactNode;
  className?: string;
  mode?: 'default' | 'shineWayPurchase';
  headerStyle?: CSSProperties;
  titleStyle?: CSSProperties;
}

const ComCard: React.FC<ComCardProps> = props => {
  const {
    title,
    subtitle,
    extra,
    className = '',
    mode = 'default',
    headerStyle = {},
    titleStyle = {},
  } = props;

  const subtitleDom = subtitle ? <span className="subtitle">{subtitle}</span> : null;
  const extraDom = extra ? <span className="extra">{extra}</span> : null;

  return (
    <div className={classnames('td-card-container', className)}>
      <div className="td-card-header" style={headerStyle}>
        <span className={mode} style={titleStyle}>
          {title}
        </span>
        {subtitleDom}
        {extraDom}
      </div>
      <div className="td-card-content">{props.children}</div>
    </div>
  );
};

export default ComCard;
