/*
 * @文件描述: 图表组合组件
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-07 14:58:12
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-28 17:24:32
 */
import React, { ReactNode } from 'react';
import ComBlock from '../com-block';
import ComCard from '../com-card';
import ChartPlot from '../chart-plot';

interface ChartDomProps {
  getDom: (dom: HTMLElement) => void;
  className?: string;
  style?: React.CSSProperties;
  title: string | ReactNode;
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
