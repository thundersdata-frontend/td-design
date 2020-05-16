/*
 * @文件描述: 柱线混合图表
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-16 10:00:02
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-16 13:23:22
 */

import { ColumnLine, ColumnLineConfig, DataItem } from '@antv/g2plot';
import { PlotCreateProps, baseComboConfig } from '../../config';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

type ColumnLineCreateProps = Merge<
  PlotCreateProps<Partial<ColumnLineConfig>>,
  {
    data: DataItem[][];
  }
>;

export default ({ dom, data, config = {} }: ColumnLineCreateProps) => {
  const plot = new ColumnLine(dom, {
    ...baseComboConfig,
    xField: 'time',
    yField: ['value', 'count'],
    columnConfig: {
      columnSize: 20,
      color: '#10B1FA',
    },
    data,
    ...config,
  });

  plot.render();
};
