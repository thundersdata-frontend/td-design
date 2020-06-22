/*
 * @文件描述: 图表组合组件
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-07 14:58:12
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-20 20:26:42
 */
import React, { ReactNode } from 'react';
import BasePlot from '@antv/g2plot/lib/base/plot';
import ComBlock from '../com-block';
import ComCard from '../com-card';
import ChartPlot from '../chart-plot';

interface ChartDomProps {
  getDom: (dom: HTMLElement) => BasePlot;
  className?: string;
  style?: React.CSSProperties;
  title: string | ReactNode;
  data?: any;
  config?: any;
  contentClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ChartDom: React.FC<ChartDomProps> = ({
  getDom,
  config,
  data,
  className,
  contentClassName,
  style = {},
  title,
  onClick,
}) => (
  <ComBlock
    onClick={onClick}
    className={className}
    contentClassName={contentClassName}
    style={style}
  >
    <ComCard title={title}>
      <ChartPlot data={data} config={config} getDom={getDom} />
    </ComCard>
  </ComBlock>
);
export default ChartDom;
