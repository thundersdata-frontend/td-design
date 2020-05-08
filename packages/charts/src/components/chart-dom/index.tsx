import React, { useRef, useEffect } from 'react';
import ComBlock from '../com-block';
import ComCard from '../com-card';

interface ChartDomProps {
  getDom: (dom: HTMLElement) => void;
  className?: string;
  style?: React.CSSProperties;
  title: string;
}

const ChartDom: React.FC<ChartDomProps> = ({ getDom, className, style = {}, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    getDom(chartRef.current!);
  }, [getDom]);

  return (
    <ComBlock className={className} style={style}>
      <ComCard title={title}>
        <div style={{ width: '100%', height: '100%' }} ref={chartRef} />
      </ComCard>
    </ComBlock>
  );
};
export default ChartDom;
