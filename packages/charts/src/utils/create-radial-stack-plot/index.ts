/*
 * @文件描述: 玉珏图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-07-04 20:37:05
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 10:46:02
 */
import { RadialBar, RadialBarOptions } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  data,
});

const createRadialBarPlot = ({ dom, data, config = {}, replaceConfig }: PlotCreateProps<Partial<RadialBarOptions>>) => {
  const plot = new RadialBar(dom, formatMergeConfig<RadialBarOptions>(getOriginConfig(data), config, replaceConfig));

  plot.render();
  return plot;
};

export default createSingleChart<RadialBarOptions, DataItem[], RadialBar>(createRadialBarPlot, {
  getOriginConfig,
});
