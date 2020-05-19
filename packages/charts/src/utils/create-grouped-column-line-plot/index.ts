/*
 * @文件描述: 分组柱线混合图表
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-16 10:00:02
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-16 13:29:02
 */

import { GroupedColumnLine, GroupedColumnLineConfig, DataItem } from '@antv/g2plot';
import { PlotCreateProps, baseComboConfig } from '../../config';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

type GroupedColumnLineCreateProps = Merge<
  PlotCreateProps<Partial<GroupedColumnLineConfig>>,
  {
    data: DataItem[][];
  }
>;

export default ({ dom, data, config = {} }: GroupedColumnLineCreateProps) => {
  const plot = new GroupedColumnLine(dom, {
    ...baseComboConfig,
    xField: 'time',
    yField: ['value', 'count'],
    groupField: 'type',
    columnConfig: {
      columnSize: 16,
      color: ['#10B1FA', '#42CF35'],
    },
    data,
    ...config,
  });

  plot.render();
};
