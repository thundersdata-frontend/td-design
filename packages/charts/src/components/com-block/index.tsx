/*
 * @文件描述: 组件显示的载体 加入边框等样式
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-09-09 13:50:09
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-21 16:59:44
 */
import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import { theme } from '../../config';

export interface ComBlockProps {
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ComBlock: React.FC<ComBlockProps> = props => {
  const { className, style = {}, contentClassName, onClick } = props;

  return (
    <div
      style={style}
      className={classnames('td-chart-comBlock', theme !== 'dark' ? 'td-chart-noBordered' : '', className)}
      onClick={onClick}
    >
      {theme === 'dark' && (
        <>
          <div className="lt-border" />
          <div className="lr-border" />
          <div className="lb-border" />
          <div className="rb-border" />
        </>
      )}
      <div className={classnames('td-chart-content', theme !== 'dark' ? 'td-white-bg' : '', contentClassName)}>
        {props.children}
      </div>
    </div>
  );
};

export default ComBlock;
