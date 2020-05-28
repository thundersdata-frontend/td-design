/*
 * @文件描述: 图表组件
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-15 10:45:32
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-28 18:41:55
 */

import React, { useRef, useEffect, useState } from 'react';
import classnames from 'classnames';

interface ChartPlotProps {
  getDom: (dom: HTMLElement) => void;
  className?: string;
  style?: React.CSSProperties;
}

const ChartPlot: React.FC<ChartPlotProps> = ({ getDom, className, style = {} }) => {
  const chartRef = useRef(null);
  const [firstRender, setFirstRender] = useState(false);

  // 防止多次getDom导致的render
  useEffect(() => {
    if (!firstRender) {
      getDom(chartRef.current!);
      setFirstRender(true);
    }
  }, [getDom]);

  return <div style={style} className={classnames('td-chart-plot', className)} ref={chartRef} />;
};
export default ChartPlot;
