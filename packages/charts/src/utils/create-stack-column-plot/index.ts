/*
 * @文件描述: 堆叠柱状图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 17:00:54
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 19:11:55
 */
import { StackedColumn, StackedColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, colors, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  xField: 'date',
  yField: 'value',
  stackField: 'type',
  data,
  color: colors,
});

const createStackColumnPlot = ({
  dom,
  data,
  config = {},
  formatConfig,
}: PlotCreateProps<Partial<StackedColumnConfig>>) => {
  const plot = new StackedColumn(
    dom,
    formatMergeConfig<StackedColumnConfig>(getOriginConfig(data), config, formatConfig),
  );

  plot.render();
  return plot;
};

export default createSingleChart<Partial<StackedColumnConfig>, DataItem[], StackedColumn>(
  createStackColumnPlot,
  { getOriginConfig },
);
