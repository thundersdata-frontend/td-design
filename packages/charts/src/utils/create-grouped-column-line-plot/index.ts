/*
 * @文件描述: 分组柱线混合图表
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-16 10:00:02
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-20 12:16:28
 */

import { GroupedColumnLine, GroupedColumnLineConfig, DataItem } from '@antv/g2plot';
import { PlotCreateProps, baseComboConfig } from '../../config';
import { getColumnLineConfig } from '../create-column-line-plot';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomGroupedColumnLineConfig extends Partial<GroupedColumnLineConfig> {
  /** 是否单轴,默认双轴 */
  isSingleAxis?: boolean;
}

type GroupedColumnLineCreateProps = Merge<
  PlotCreateProps<CustomGroupedColumnLineConfig>,
  {
    data: DataItem[][];
  }
>;

export default ({ dom, data, config = {} }: GroupedColumnLineCreateProps) => {
  const plotConfig = getColumnLineConfig(data, config);
  const plot = new GroupedColumnLine(dom, {
    ...baseComboConfig,
    xField: 'time',
    yField: ['value', 'count'],
    columnGroupField: 'type',
    columnConfig: {
      columnSize: 16,
      color: ['#10B1FA', '#42CF35'],
    },
    data,
    ...plotConfig,
    ...config,
  });

  plot.render();
};
