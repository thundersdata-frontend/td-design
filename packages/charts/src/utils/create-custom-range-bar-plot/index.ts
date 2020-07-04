/*
 * @文件描述: 区间条形图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-29 17:02:07
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 18:49:02
 */
import { PlotCreateProps, baseConfig, hideAxisConfig, DataItem } from '../../config';
import CustomRangeBar, { CustomRangeBarConfig } from '../../g2components/CustomRangeBar';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  xAxis: hideAxisConfig,
  yAxis: hideAxisConfig,
  data,
  padding: [0, 0, 10, 0],
  color: 'l(0) 0:rgba(24, 137, 243, 1) 1:rgba(0, 210, 255, 1)',
});

const createCustomRangeBarPlot = ({
  dom,
  data,
  config = {},
  formatConfig,
}: PlotCreateProps<CustomRangeBarConfig>) => {
  const plot = new CustomRangeBar(
    dom,
    formatMergeConfig<CustomRangeBarConfig>(getOriginConfig(data), config, formatConfig),
  );

  plot.render();
  return plot;
};

export default createSingleChart<CustomRangeBarConfig, DataItem[], CustomRangeBar>(
  createCustomRangeBarPlot,
  { getOriginConfig },
);
