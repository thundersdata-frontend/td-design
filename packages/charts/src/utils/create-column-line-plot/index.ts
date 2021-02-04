/*
 * @文件描述: 柱线混合图表
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-16 10:00:02
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 10:58:25
 */

import { DualAxes, DualAxesOptions } from '@antv/g2plot';
import { PlotCreateProps, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomDualAxesOptions extends Partial<DualAxesOptions> {
  /** 是否单轴,默认双轴 */
  isSingleAxis?: boolean;
}

type DualAxesCreateProps = Merge<
  PlotCreateProps<CustomDualAxesOptions>,
  {
    data: DataItem[][];
  }
>;

// 得到混合图表的自定义配置项
export const getDualAxesOptions = (config?: CustomDualAxesOptions) => {
  const { isSingleAxis = false } = config || {};
  const DualAxesOptions = {
    // yAxis: {
    //   leftConfig: baseComboYAxis,
    //   rightConfig: baseComboYAxis,
    // },
    count: !isSingleAxis,
  };
  return DualAxesOptions[isSingleAxis ? 'singleAxis' : 'default'];
};

/** 获得原始配置 */
const getOriginConfig = (
  data: DataItem[][],
  config?: CustomDualAxesOptions,
  replaceConfig?: (config: CustomDualAxesOptions) => CustomDualAxesOptions
) => {
  const transformedConfig = replaceConfig ? replaceConfig(config || {}) : config;
  const plotConfig = getDualAxesOptions(transformedConfig);
  return {
    // ...baseComboConfig,
    xField: 'time',
    yField: ['value', 'count'],
    columnConfig: {
      columnSize: 24,
      color: '#10B1FA',
      columnStyle: {
        cursor: 'pointer',
      },
    },
    data,
    ...plotConfig,
  };
};

const createDualAxesPlot = ({ dom, data, config = {}, replaceConfig }: DualAxesCreateProps) => {
  const { isSingleAxis, ...restConfig } = config || {};

  const plot = new DualAxes(
    dom,
    formatMergeConfig<DualAxesOptions>(getOriginConfig(data, config, replaceConfig), restConfig, replaceConfig)
  );

  plot.render();
  return plot;
};

export default createSingleChart<CustomDualAxesOptions, DataItem[][], DualAxes>(createDualAxesPlot, {
  getOriginConfig,
});
