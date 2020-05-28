/*
 * @文件描述: 图表模块切换到详情后 的link标题
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2019-11-21 16:04:45
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-28 17:43:42
 */
import React, { CSSProperties } from 'react';

interface TitleLinkProps {
  title: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const TitleLink: React.FC<TitleLinkProps> = props => {
  const { title, className = '', style = {}, onClick = () => {} } = props;

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <img src={require('../../assets/back.png')} alt="" style={{ marginRight: 4 }} />
      <span>{title}</span>
    </div>
  );
};

export default TitleLink;
