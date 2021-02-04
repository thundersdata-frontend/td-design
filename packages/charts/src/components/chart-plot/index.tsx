/*
 * @文件描述: 图表组件
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-15 10:45:32
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 19:29:39
 */

import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import { Plot } from '@antv/g2plot/lib/core/plot';
import { theme } from '../../config';
import CustomBase from '../../g2components/base';

interface ChartPlotProps {
  getDom: (dom: HTMLElement) => Partial<Plot<any>> | CustomBase<any>;
  className?: string;
  style?: React.CSSProperties;
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
