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
