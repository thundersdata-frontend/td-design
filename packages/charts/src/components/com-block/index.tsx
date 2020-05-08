/*
 * @文件描述: 组件显示的载体 加入边框等样式
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-09-09 13:50:09
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-07 15:41:42
 */
import React, { CSSProperties } from 'react';
import classnames from 'classnames';

export interface ComBlockProps {
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ComBlock: React.FC<ComBlockProps> = props => {
  const { className, style = {}, contentClassName, onClick } = props;

  return (
    <div style={style} className={classnames('comBlock', className)} onClick={onClick}>
      <div className={'lt-border'} />
      <div className={'lr-border'} />
      <div className={'lb-border'} />
      <div className={'rb-border'} />
      <div className={classnames('content', contentClassName)}>{props.children}</div>
    </div>
  );
};

export default ComBlock;
