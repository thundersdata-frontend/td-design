/*
 * @文件描述: 瀑布图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-28 09:46:33
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 19:17:45
 */
import { Waterfall, WaterfallConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  data,
  label: { visible: false },
  showTotal: { visible: false, label: '' },
  color: {
    rising: 'rgba(216, 30, 25, 1)',
    falling: 'rgba(73, 213, 18, 1)',
    total: 'rgba(73, 213, 18, 0)',
  },
});

const createWaterfallPlot = ({
  dom,
  data,
  config = {},
  formatConfig,
}: PlotCreateProps<Partial<WaterfallConfig>>) => {
  const plot = new Waterfall(
    dom,
    formatMergeConfig<WaterfallConfig>(getOriginConfig(data), config, formatConfig),
  );

  plot.render();
  return plot;
};

export default createSingleChart<Partial<WaterfallConfig>, DataItem[], Waterfall>(
  createWaterfallPlot,
  { getOriginConfig },
);
