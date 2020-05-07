/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 13:56:23
 * @LastEditors: 廖军
 * @LastEditTime: 2020-04-28 15:23:53
 */
import { Column, ColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps } from '../../config';

export default ({ dom, data, config = {} }: PlotCreateProps<ColumnConfig>) => {
  const plot = new Column(dom, {
    ...baseConfig,
    data,
    color: 'rgba(0, 187, 255, 1)',
    ...config,
  });

  plot.render();
};
