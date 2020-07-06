/*
 * @文件描述: 普通柱状图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 13:56:23
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 18:45:41
 */
import { Column, ColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  data,
});

const createColumnPlot = ({
  dom,
  data,
  config = {},
  replaceConfig,
}: PlotCreateProps<ColumnConfig>) => {
  const plot = new Column(
    dom,
    formatMergeConfig<ColumnConfig>(getOriginConfig(data), config, replaceConfig),
  );

  plot.render();
  return plot;
};

export default createSingleChart<ColumnConfig, DataItem[], Column>(createColumnPlot, {
  getOriginConfig,
});
