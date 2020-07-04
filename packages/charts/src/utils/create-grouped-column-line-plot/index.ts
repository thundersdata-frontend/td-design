/*
 * @文件描述: 分组柱线混合图表
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-05-16 10:00:02
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 20:01:47
 */

import { GroupedColumnLine, GroupedColumnLineConfig, DataItem } from '@antv/g2plot';
import { PlotCreateProps, baseComboConfig } from '../../config';
import { getColumnLineConfig } from '../create-column-line-plot';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomGroupedColumnLineConfig extends Partial<GroupedColumnLineConfig> {
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
  formatConfig?: (config: CustomGroupedColumnLineConfig) => CustomGroupedColumnLineConfig,
) => {
  const transformedConfig = formatConfig ? formatConfig(config || {}) : config;
  const plotConfig = getColumnLineConfig(data, transformedConfig);
  return {
    ...baseComboConfig,
    xField: 'time',
    yField: ['value', 'count'],
    columnGroupField: 'type',
    columnConfig: {
      columnSize: 24,
      color: ['#10B1FA', '#42CF35'],
    },
    data,
    ...plotConfig,
  };
};

const createGroupedColumnLinePlot = ({
  dom,
  data,
  config = {},
  formatConfig,
}: GroupedColumnLineCreateProps) => {
  const { isSingleAxis, ...restConfig } = config || {};
  const plot = new GroupedColumnLine(
    dom,
    formatMergeConfig<GroupedColumnLineConfig>(
      getOriginConfig(data, config, formatConfig),
      restConfig,
      formatConfig,
    ),
  );

  plot.render();
  return plot;
};

export default createSingleChart<CustomGroupedColumnLineConfig, DataItem[][], GroupedColumnLine>(
  createGroupedColumnLinePlot,
  {
    getOriginConfig,
  },
);
