/*
 * @文件描述: 径向堆叠柱形图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 19:05:36
 */
import { PlotCreateProps, DataItem } from '../../config';
import CustomRadialStack, { CustomRadialConfig } from '../../g2components/CustomRadialStack';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

const createRadialStackPlot = ({
  dom,
  data,
  config = {},
  formatConfig,
}: PlotCreateProps<CustomRadialConfig>) => {
  const radialStackPlot = new CustomRadialStack(
    dom,
    formatMergeConfig<CustomRadialConfig>(
      {
        data,
      },
      config,
      formatConfig,
    ),
  );

  radialStackPlot.render();
  return radialStackPlot;
};

export default createSingleChart<CustomRadialConfig, DataItem[], CustomRadialStack>(
  createRadialStackPlot,
);
