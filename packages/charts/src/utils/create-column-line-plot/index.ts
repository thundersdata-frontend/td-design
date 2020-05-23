/*
 * @文件描述: 柱线混合图表
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-16 10:00:02
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-23 17:42:24
 */

import { ColumnLine, ColumnLineConfig, DataItem } from '@antv/g2plot';
import { PlotCreateProps, baseComboConfig, baseComboYAxis } from '../../config';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomColumnLineConfig extends Partial<ColumnLineConfig> {
  /** 是否单轴,默认双轴 */
  isSingleAxis?: boolean;
}

type ColumnLineCreateProps = Merge<
  PlotCreateProps<CustomColumnLineConfig>,
  {
    data: DataItem[][];
  }
>;

// 得到混合图表的自定义配置项
export const getColumnLineConfig = (data: DataItem[][], config: CustomColumnLineConfig) => {
  const { isSingleAxis = false, yField } = config;
  const [barData, lineData] = data;
  const [barField, lineField] = yField || ['value', 'count'];
  const mixData = barData
    .map(item => (item[barField] || 0) as number)
    .concat(lineData.map(item => (item[lineField] || 0) as number));
  const max = Math.max(...mixData);
  const columnLineConfig = {
    // 如果是单轴
    singleAxis: {
      yAxis: {
        max,
        min: 0,
        rightConfig: {
          ...baseComboYAxis,
          visible: false,
        },
        leftConfig: baseComboYAxis,
      },
    },
    default: {
      yAxis: {
        leftConfig: baseComboYAxis,
        rightConfig: baseComboYAxis,
      },
    },
  };
  return columnLineConfig[isSingleAxis ? 'singleAxis' : 'default'];
};

export default ({ dom, data, config = {} }: ColumnLineCreateProps) => {
  const plotConfig = getColumnLineConfig(data, config);
  const plot = new ColumnLine(dom, {
    ...baseComboConfig,
    xField: 'time',
    yField: ['value', 'count'],
    columnConfig: {
      columnSize: 24,
      color: '#10B1FA',
    },
    data,
    ...plotConfig,
    ...config,
  });

  plot.render();
  return plot;
};
