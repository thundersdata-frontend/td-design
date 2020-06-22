/*
 * @文件描述: 区间条形图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-29 17:02:07
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-21 22:44:25
 */
import { PlotCreateProps, baseConfig, hideAxisConfig } from '../../config';
import CustomRangeBar, { CustomRangeBarConfig } from '../../g2components/CustomRangeBar';
import { createSingleChart } from '../../baseUtils/chart';

const createCustomRangeBarPlot = ({
  dom,
  data,
  config = {},
}: PlotCreateProps<CustomRangeBarConfig>) => {
  const plot = new CustomRangeBar(dom, {
    ...baseConfig,
    xAxis: hideAxisConfig,
    yAxis: hideAxisConfig,
    data,
    padding: [0, 0, 10, 0],
    color: 'l(0) 0:rgba(24, 137, 243, 1) 1:rgba(0, 210, 255, 1)',
    ...config,
  });

  plot.render();
  return plot;
};

export default createSingleChart(createCustomRangeBarPlot);
