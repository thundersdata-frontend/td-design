/*
 * @文件描述: 双折线图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-06-22 14:00:41
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 20:02:00
 */

import { DualLine, DualLineConfig, DataItem } from '@antv/g2plot';
import { PlotCreateProps, baseComboConfig, dualLineColor } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';
import { getColumnLineConfig } from '../create-column-line-plot';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomDualLineConfig extends Partial<DualLineConfig> {
  /** 是否单轴,默认双轴 */
  isSingleAxis?: boolean;
  /** 控制线的颜色 */
  color?: string[];
}

type DualLineCreateProps = Merge<
  PlotCreateProps<CustomDualLineConfig>,
  {
    data: DataItem[][];
  }
>;

const getDualLineConfig = (data: DataItem[][], config?: CustomDualLineConfig) => {
  const { color = dualLineColor } = config || {};
  const plotConfig = getColumnLineConfig(data, config);
  // 只有一条数据时显示点
  const showPoint = data ? [data[0].length <= 1, data[1].length <= 1] : [false, false];
  return {
    ...plotConfig,
    lineConfigs: [
      {
        color: color[0],
        smooth: false,
        point: {
          visible: showPoint[0],
        },
      },
      {
        color: color[1],
        smooth: false,
        point: {
          visible: showPoint[1],
        },
      },
    ],
  };
};

/** 获得原始配置 */
const getOriginConfig = (
  data: DataItem[][],
  config?: CustomDualLineConfig,
  formatConfig?: (config: CustomDualLineConfig) => CustomDualLineConfig,
) => {
  const transformedConfig = formatConfig ? formatConfig(config || {}) : config;
  const plotConfig = getDualLineConfig(data, transformedConfig);
  return {
    ...baseComboConfig,
    xField: 'time',
    yField: ['value', 'count'],
    data,
    ...plotConfig,
  };
};

const createDualLinePlot = ({ dom, data, config = {}, formatConfig }: DualLineCreateProps) => {
  const { color, isSingleAxis, ...restConfig } = config;

  const plot = new DualLine(
    dom,
    formatMergeConfig<DualLineConfig>(
      getOriginConfig(data, config, formatConfig),
      restConfig,
      formatConfig,
    ),
  );

  plot.render();
  return plot;
};

export default createSingleChart<CustomDualLineConfig, DataItem[][], DualLine>(createDualLinePlot, {
  getOriginConfig,
});
