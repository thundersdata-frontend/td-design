/*
 * @文件描述: 分组柱线混合图表
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-16 10:00:02
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-04 15:52:13
 */

import { DualAxes, DualAxesOptions } from '@antv/g2plot';
import { PlotCreateProps, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomGroupedColumnLineConfig extends Partial<DualAxesOptions> {
  /** 是否单轴,默认双轴 */
  isSingleAxis?: boolean;
}

type GroupedColumnLineCreateProps = Merge<
  PlotCreateProps<CustomGroupedColumnLineConfig>,
  {
    data: DataItem[][];
  }
>;

/** 获得原始配置 */
const getOriginConfig = (
  data: DataItem[][],
  config?: CustomGroupedColumnLineConfig,
  replaceConfig?: (config: CustomGroupedColumnLineConfig) => CustomGroupedColumnLineConfig
) => {
  const transformedConfig = replaceConfig ? replaceConfig(config || {}) : config;
  return {
    xField: 'time',
    yField: ['value', 'count'],
    data,
    ...transformedConfig,
  };
};

const createGroupedColumnLinePlot = ({ dom, data, config = {}, replaceConfig }: GroupedColumnLineCreateProps) => {
  const { isSingleAxis, ...restConfig } = config || {};
  const plot = new DualAxes(
    dom,
    formatMergeConfig<DualAxesOptions>(getOriginConfig(data, config, replaceConfig), restConfig, replaceConfig)
  );

  plot.render();
  return plot;
};

export default createSingleChart<CustomGroupedColumnLineConfig, DataItem[][], DualAxes>(createGroupedColumnLinePlot, {
  getOriginConfig,
});
