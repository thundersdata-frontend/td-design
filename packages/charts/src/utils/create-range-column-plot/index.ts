/*
 * @文件描述: 区间柱状图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 17:11:09
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-18 16:08:00
 */
import { RangeColumn, RangeColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, colors } from '../../config';

export default ({ dom, data, config }: PlotCreateProps<RangeColumnConfig>) => {
  const plot = new RangeColumn(dom, {
    ...baseConfig,
    label: { visible: false },
    data,
    color: colors[0],
    ...config,
  });

  plot.render();
};
