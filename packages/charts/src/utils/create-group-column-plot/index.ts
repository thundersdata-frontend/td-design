/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 16:43:00
 * @LastEditors: 廖军
 * @LastEditTime: 2020-04-28 16:41:45
 */
import { GroupedColumn, GroupedColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, colors } from '../../config';

export default ({ dom, data, config }: PlotCreateProps<GroupedColumnConfig>) => {
  const plot = new GroupedColumn(dom, {
    ...baseConfig,
    xField: 'date',
    yField: 'value',
    groupField: 'type',
    data,
    color: colors,
    ...config,
  });

  plot.render();
};
