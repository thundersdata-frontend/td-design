/*
 * @文件描述: 基础条形图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-28 14:51:33
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-01-27 14:22:26
 */
import { PlotCreateProps, baseConfig, hideAxisConfig, DataItem } from '../../config';
import CustomBar, { CustomBarConfig } from '../../g2components/CustomBar';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  xAxis: hideAxisConfig,
  yAxis: hideAxisConfig,
  data,
  color: 'l(0) 0:rgba(24, 137, 243, 1) 1:rgba(0, 210, 255, 1)',
});

const createDonutRosePlot = ({ dom, data, config = {}, replaceConfig }: PlotCreateProps<CustomBarConfig>) => {
  const plot = new CustomBar(dom, formatMergeConfig<CustomBarConfig>(getOriginConfig(data), config, replaceConfig));

  plot.render();

  return plot;
};

export default createSingleChart<CustomBarConfig, DataItem[], CustomBar>(createDonutRosePlot, {
  getOriginConfig,
});
