/*
 * @文件描述: 瀑布图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-28 09:46:33
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 11:20:28
 */
import { Waterfall, WaterfallOptions } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type CustomWaterfallConfig = Merge<
  Partial<WaterfallOptions>,
  {
    // 颜色
    color?: string | string[] | ((datum: Record<string, any>) => string);
  }
>;

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  xField: '',
  yField: '',
  data,
  // label: false,
  showTotal: { visible: false, label: '' },
  // color: {
  //   rising: 'rgba(216, 30, 25, 1)',
  //   falling: 'rgba(73, 213, 18, 1)',
  //   total: 'rgba(73, 213, 18, 0)',
  // },
});

const createWaterfallPlot = ({ dom, data, config = {}, replaceConfig }: PlotCreateProps<CustomWaterfallConfig>) => {
  const plot = new Waterfall(dom, formatMergeConfig<WaterfallOptions>(getOriginConfig(data), config, replaceConfig));

  plot.render();
  return plot;
};

export default createSingleChart<Partial<WaterfallOptions>, DataItem[], Waterfall>(createWaterfallPlot, {
  getOriginConfig,
});
