/*
 * @文件描述: 区间条形图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-29 17:02:07
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-18 16:10:47
 */
import { PlotCreateProps, baseConfig, hideAxisConfig } from '../../config';
import CustomRangeBar, { CustomRangeBarConfig } from '../../g2components/CustomRangeBar';

export default ({ dom, data, config = {} }: PlotCreateProps<CustomRangeBarConfig>) => {
  const plot = new CustomRangeBar(dom, {
    ...baseConfig,
    xAxis: hideAxisConfig,
    yAxis: hideAxisConfig,
    data,
    color: 'l(0) 0:rgba(24, 137, 243, 1) 1:rgba(0, 210, 255, 1)',
    ...config,
  });

  plot.render();
};
