/*
 * @文件描述: 流程节点组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-07-15 17:03:00
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-07-18 21:46:00
 */
import React from 'react';
import { Icon } from 'antd';
import baseImage from './baseImage';

export interface ProcessNodeProps {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  imageUrl?: string;
  onRemove?: () => void;
}
const ProcessNode: React.FC<ProcessNodeProps> = ({ title, subtitle, imageUrl = baseImage, onRemove }) => {
  // subtitle
  const Subtitle = subtitle ? <div className="td-process-node-subtitle">{subtitle}</div> : null;
  // removeIcon
  const RemoveIcon =
    typeof onRemove === 'function' ? (
      <Icon className="td-process-node-remove" onClick={onRemove} type="close-circle" />
    ) : null;
  return (
    <div className="td-process-node">
      {RemoveIcon}
      <img className="td-process-node-image" src={imageUrl} />
      <div className="td-process-node-title">{title}</div>
      {Subtitle}
    </div>
  );
};

export default ProcessNode;
