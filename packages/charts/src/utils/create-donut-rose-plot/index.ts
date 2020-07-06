/*
 * @文件描述: 玫瑰图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 16:02:33
 */
import { PlotCreateProps, DataItem } from '../../config';
import CustomDonutRose, { CustomRoseConfig } from '../../g2components/CustomDonutRose';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

const createDonutRosePlot = ({
  dom,
  data,
  config = {},
  replaceConfig,
}: PlotCreateProps<CustomRoseConfig>) => {
  const rosePlot = new CustomDonutRose(
    dom,
    formatMergeConfig<CustomRoseConfig>(
      {
        data,
      },
      config,
      replaceConfig,
    ),
  );

  rosePlot.render();
  return rosePlot;
};

export default createSingleChart<CustomRoseConfig, DataItem[], CustomDonutRose>(
  createDonutRosePlot,
);
