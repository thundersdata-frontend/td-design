/*
 * @文件描述: 面积图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-29 14:52:09
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 19:11:14
 */

import { StackedArea, StackAreaConfig } from '@antv/g2plot';
import { PlotCreateProps, baseConfig, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  data,
  xField: 'date',
  yField: 'value',
  stackField: 'type',
  color: ['#FEB01E', '#EC6725', '#38B03B'],
});

const createStackAreaPlot = ({
  dom,
  data,
  config = {},
  replaceConfig,
}: PlotCreateProps<Partial<StackAreaConfig>>) => {
  const plot = new StackedArea(
    dom,
    formatMergeConfig<StackAreaConfig>(getOriginConfig(data), config, replaceConfig),
  );

  plot.render();
  return plot;
};

export default createSingleChart<Partial<StackAreaConfig>, DataItem[], StackedArea>(
  createStackAreaPlot,
  { getOriginConfig },
);
