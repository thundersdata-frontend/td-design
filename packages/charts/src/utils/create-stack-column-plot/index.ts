/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 17:00:54
 * @LastEditors: 廖军
 * @LastEditTime: 2020-04-28 16:42:32
 */
import { StackedColumn, StackedColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, colors } from '../../config';

export default ({ dom, data, config }: PlotCreateProps<StackedColumnConfig>) => {
  const plot = new StackedColumn(dom, {
    ...baseConfig,
    xField: 'date',
    yField: 'value',
    stackField: 'type',
    data,
    color: colors,
    ...config,
  });

  plot.render();
};
