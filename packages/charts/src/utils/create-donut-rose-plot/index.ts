/*
 * @文件描述: 玫瑰图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-22 10:11:54
 */
import { PlotCreateProps } from '../../config';
import CustomDonutRose, { CustomRoseConfig } from '../../g2components/CustomDonutRose';
import { createSingleChart } from '../../baseUtils/chart';

const createDonutRosePlot = ({ dom, data, config }: PlotCreateProps<CustomRoseConfig>) => {
  const rosePlot = new CustomDonutRose(dom, {
    data,
    ...config,
  });
  rosePlot.render();
  return rosePlot;
};

export default createSingleChart(createDonutRosePlot);
