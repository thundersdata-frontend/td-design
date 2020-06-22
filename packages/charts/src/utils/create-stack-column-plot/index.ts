/*
 * @文件描述: 堆叠柱状图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 17:00:54
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-20 21:14:20
 */
import { StackedColumn, StackedColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, colors } from '../../config';
import { createSingleChart } from '../../baseUtils/chart';

const createStackColumnPlot = ({ dom, data, config }: PlotCreateProps<StackedColumnConfig>) => {
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
  return plot;
};

export default createSingleChart(createStackColumnPlot);
