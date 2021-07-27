import React, { FC, ReactText } from 'react';
import ReactEcharts from 'echarts-for-react';
import getOption from './config';

/** 数据类型 */
export interface DataType {
  data: ReactText[];
}

/** 数据源类型 */
export interface DataSourceProps {
  xAxis?: DataType[];
  yAxis?: DataType[];
  series?: DataType[];
}

export interface PieChartProps {
  /** 数据源 */
  dataSource: DataSourceProps;
  /** 是否在弹窗中 */
  inModal?: boolean;
}

/** TODO: 完善其他参数 */
const PieChart: FC<PieChartProps> = ({ dataSource, inModal }) => (
  <ReactEcharts option={getOption(dataSource, inModal)} />
);

export default PieChart;
