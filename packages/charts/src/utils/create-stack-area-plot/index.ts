/*
 * @文件描述: 面积图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-29 14:52:09
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 10:05:52
 */

import { Area, AreaOptions } from '@antv/g2plot';
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

const createStackAreaPlot = ({ dom, data, config = {}, replaceConfig }: PlotCreateProps<Partial<AreaOptions>>) => {
  const plot = new Area(dom, formatMergeConfig<AreaOptions>(getOriginConfig(data), config, replaceConfig));

  plot.render();
  return plot;
};

export default createSingleChart<Partial<AreaOptions>, DataItem[], Area>(createStackAreaPlot, {
  getOriginConfig,
});
