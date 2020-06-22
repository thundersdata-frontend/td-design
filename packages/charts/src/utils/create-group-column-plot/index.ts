/*
 * @文件描述: 分组柱状图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 16:43:00
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-22 10:12:01
 */
import { GroupedColumn, GroupedColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, colors } from '../../config';
import { createSingleChart } from '../../baseUtils/chart';

const createGroupColumnPlot = ({ dom, data, config }: PlotCreateProps<GroupedColumnConfig>) => {
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
  return plot;
};

export default createSingleChart(createGroupColumnPlot);
