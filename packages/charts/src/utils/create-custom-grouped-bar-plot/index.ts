/*
 * @文件描述: 分组条形图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-30 14:06:37
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 00:16:51
 */
import { PlotCreateProps, baseConfig, baseXAxis, baseYAxis, DataItem } from '../../config';
import CustomGroupedBar, { CustomGroupedBarConfig } from '../../g2components/CustomGroupedBar';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  xAxis: baseXAxis,
  yAxis: baseYAxis,
  data,
  color: [
    'l(0) 0:rgba(236, 103, 37, 1) 1:rgba(254, 176, 30, 1)',
    'l(0) 0:rgba(24, 137, 243, 1) 1:rgba(0, 210, 255, 1)',
  ],
});

const createCustomGroupedBarPlot = ({
  dom,
  data,
  config = {},
  replaceConfig,
}: PlotCreateProps<CustomGroupedBarConfig>) => {
  const plot = new CustomGroupedBar(
    dom,
    formatMergeConfig<CustomGroupedBarConfig>(getOriginConfig(data), config, replaceConfig)
  );

  plot.render();
  return plot;
};

export default createSingleChart<CustomGroupedBarConfig, DataItem[], CustomGroupedBar>(createCustomGroupedBarPlot, {
  getOriginConfig,
});
