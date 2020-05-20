/*
 * @文件描述: 图表组件
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-15 10:45:32
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-18 15:57:44
 */

import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';

interface ChartPlotProps {
  getDom: (dom: HTMLElement) => void;
  className?: string;
  style?: React.CSSProperties;
}

const ChartPlot: React.FC<ChartPlotProps> = ({ getDom, className, style = {} }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    getDom(chartRef.current!);
  }, [getDom]);

  return <div style={style} className={classnames('td-chart-plot', className)} ref={chartRef} />;
};
export default ChartPlot;
