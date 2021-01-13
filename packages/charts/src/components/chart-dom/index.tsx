/*
 * @文件描述: 图表组合组件
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-07 14:58:12
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2021-01-13 14:15:20
 */
import React from 'react';
import BasePlot from '@antv/g2plot/lib/base/plot';
import ComBlock from '../com-block';
import ComCard, { ComCardProps } from '../com-card';
import ChartPlot from '../chart-plot';

export interface ChartDomProps extends Pick<ComCardProps, 'title' | 'titleStyle'> {
  getDom: (dom: HTMLElement) => BasePlot;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ChartDom: React.FC<ChartDomProps> = ({
  getDom,
  className,
  contentClassName,
  style = {},
  title,
  onClick,
  titleStyle,
}) => (
  <ComBlock onClick={onClick} className={className} contentClassName={contentClassName} style={style}>
    <ComCard title={title} titleStyle={titleStyle}>
      <ChartPlot getDom={getDom} />
    </ComCard>
  </ComBlock>
);
export default ChartDom;
