import React from 'react';
import ComBlock from '../com-block';
import ComCard from '../com-card';
import ChartPlot from '../chart-plot';

interface ChartDomProps {
  getDom: (dom: HTMLElement) => void;
  className?: string;
  style?: React.CSSProperties;
  title: string;
}

const ChartDom: React.FC<ChartDomProps> = ({ getDom, className, style = {}, title }) => (
  <ComBlock className={className} style={style}>
    <ComCard title={title}>
      <ChartPlot getDom={getDom} />
    </ComCard>
  </ComBlock>
);
export default ChartDom;
