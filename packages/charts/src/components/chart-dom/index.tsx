/*
 * @文件描述: 图表组合组件
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-07 14:58:12
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-18 16:39:44
 */
import React from 'react';
import ComBlock from '../com-block';
import ComCard from '../com-card';
import ChartPlot from '../chart-plot';

interface ChartDomProps {
  getDom: (dom: HTMLElement) => void;
  className?: string;
  style?: React.CSSProperties;
  title: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ChartDom: React.FC<ChartDomProps> = ({ getDom, className, style = {}, title, onClick }) => (
  <ComBlock onClick={onClick} className={className} style={style}>
    <ComCard title={title}>
      <ChartPlot getDom={getDom} />
    </ComCard>
  </ComBlock>
);
export default ChartDom;
