/*
 * @文件描述: 普通柱状图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 13:56:23
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-23 17:42:38
 */
import { Column, ColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps } from '../../config';

export default ({ dom, data, config = {} }: PlotCreateProps<ColumnConfig>) => {
  const plot = new Column(dom, {
    ...baseConfig,
    data,
    ...config,
  });

  plot.render();
  return plot;
};
