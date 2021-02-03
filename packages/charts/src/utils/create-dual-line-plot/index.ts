/*
 * @文件描述: 双折线图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-06-22 14:00:41
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 10:58:39
 */

import { DualAxes, DualAxesOptions } from '@antv/g2plot';
import { PlotCreateProps, dualLineColor, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomDualLineConfig extends Partial<DualAxesOptions> {
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
  // 只有一条数据时显示点
  const showPoint = data ? [data[0].length <= 1, data[1].length <= 1] : [false, false];
  return {
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
  replaceConfig?: (config: CustomDualLineConfig) => CustomDualLineConfig
) => {
  const transformedConfig = replaceConfig ? replaceConfig(config || {}) : config;
  const plotConfig = getDualLineConfig(data, transformedConfig);
  return {
    xField: 'time',
    yField: ['value', 'count'],
    data,
    ...plotConfig,
  };
};

const createDualLinePlot = ({ dom, data, config = {}, replaceConfig }: DualLineCreateProps) => {
  const { color, isSingleAxis, ...restConfig } = config;

  const plot = new DualAxes(
    dom,
    formatMergeConfig<DualAxesOptions>(getOriginConfig(data, config, replaceConfig), restConfig, replaceConfig)
  );

  plot.render();
  return plot;
};

export default createSingleChart<CustomDualLineConfig, DataItem[][], DualAxes>(createDualLinePlot, {
  getOriginConfig,
});
