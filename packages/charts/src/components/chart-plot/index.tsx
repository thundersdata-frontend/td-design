/*
 * @文件描述: 图表组件
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-15 10:45:32
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-21 22:35:35
 */

import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import BasePlot from '@antv/g2plot/lib/base/plot';
import { theme } from '../../config';

interface ChartPlotProps {
  getDom: (dom: HTMLElement) => BasePlot;
  className?: string;
  style?: React.CSSProperties;
  data?: any;
  config?: any;
}

const ChartPlot: React.FC<ChartPlotProps> = ({ getDom, className, style = {} }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDom(chartRef.current!);
  }, [getDom]);

  return (
    <div
      style={style}
      className={classnames('td-chart-plot', className, theme === 'dark' ? 'td-black-plot' : '')}
      ref={chartRef}
    />
  );
};
export default ChartPlot;
