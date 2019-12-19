/*
 * @文件描述: 流程节点组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-07-15 17:03:00
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-09 16:34:38
 */
import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import { Icon } from 'antd';
import baseImage from './baseImage';

export interface ProcessNodeProps {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  imageUrl?: string;
  onRemove?: () => void;
  className?: string;
  style?: CSSProperties;
}
const ProcessNode: React.FC<ProcessNodeProps> = ({
  title,
  subtitle,
  imageUrl = baseImage,
  onRemove,
  className,
  style,
}) => {
  // subtitle
  const Subtitle = subtitle ? <div className="td-process-node-subtitle">{subtitle}</div> : null;
  // removeIcon
  const RemoveIcon =
    typeof onRemove === 'function' ? (
      <Icon className="td-process-node-remove" onClick={onRemove} type="close-circle" />
    ) : null;
  return (
    <div className={classnames('td-process-node', className)} style={style}>
      {RemoveIcon}
      <img className="td-process-node-image" src={imageUrl} />
      <div className="td-process-node-title">{title}</div>
      {Subtitle}
    </div>
  );
};

export default ProcessNode;
