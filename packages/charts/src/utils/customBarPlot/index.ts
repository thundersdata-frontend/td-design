/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-28 14:51:33
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-07 14:35:31
 */
import { PlotCreateProps, baseConfig, hideAxisConfig } from '../../config';
import CustomBar, { CustomBarConfig } from '../../g2components/CustomBar';

export default ({ dom, data, config = {} }: PlotCreateProps<CustomBarConfig>) => {
  const plot = new CustomBar(dom, {
    ...baseConfig,
    xAxis: hideAxisConfig,
    yAxis: hideAxisConfig,
    data,
    color: 'l(0) 0:rgba(24, 137, 243, 1) 1:rgba(0, 210, 255, 1)',
    ...config,
  });

  plot.render();
};
