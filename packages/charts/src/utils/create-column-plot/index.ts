/*
 * @文件描述: 普通柱状图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 13:56:23
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 11:20:39
 */
import { Column, ColumnOptions } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  xField: '',
  yField: '',
  data,
});

const createColumnPlot = ({ dom, data, config = {}, replaceConfig }: PlotCreateProps<Partial<ColumnOptions>>) => {
  const plot = new Column(dom, formatMergeConfig<ColumnOptions>(getOriginConfig(data), config, replaceConfig));

  plot.render();
  return plot;
};

export default createSingleChart<ColumnOptions, DataItem[], Column>(createColumnPlot, {
  getOriginConfig,
});
