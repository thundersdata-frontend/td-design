/*
 * @文件描述: 径向堆叠柱形图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-23 17:44:33
 */
import { PlotCreateProps } from '../../config';
import CustomRadialStack, { CustomRadialConfig } from '../../g2components/CustomRadialStack';

const createRadialStackPlot = ({ dom, data, config }: PlotCreateProps<CustomRadialConfig>) => {
  const radialStackPlot = new CustomRadialStack(dom, {
    data,
    ...config,
  });
  radialStackPlot.render();
  return radialStackPlot;
};
export default createRadialStackPlot;
