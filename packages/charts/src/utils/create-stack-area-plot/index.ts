/*
 * @文件描述: 面积图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-29 14:52:09
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-04-29 15:09:00
 */

import { StackedArea, StackAreaConfig } from '@antv/g2plot';
import { PlotCreateProps, baseConfig } from '../../config';

export default ({ dom, data, config }: PlotCreateProps<StackAreaConfig>) => {
  const plot = new StackedArea(dom, {
    ...baseConfig,
    data,
    xField: 'date',
    yField: 'value',
    stackField: 'type',
    color: ['#FEB01E', '#EC6725', '#38B03B'],
    ...config,
  });

  plot.render();
};
