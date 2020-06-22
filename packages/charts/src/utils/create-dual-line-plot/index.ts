/*
 * @文件描述: 双折线图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-06-22 14:00:41
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-22 14:24:32
 */

import { DualLine, DualLineConfig, DataItem } from '@antv/g2plot';
import { PlotCreateProps, baseComboConfig } from '../../config';
import { createSingleChart } from '../../baseUtils/chart';
import { getColumnLineConfig } from '../create-column-line-plot';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomDualLineConfig extends Partial<DualLineConfig> {
  /** 是否单轴,默认双轴 */
  isSingleAxis?: boolean;
}

type DualLineCreateProps = Merge<
  PlotCreateProps<CustomDualLineConfig>,
  {
    data: DataItem[][];
  }
>;

const createDualLinePlot = ({ dom, data, config = {} }: DualLineCreateProps) => {
  const plotConfig = getColumnLineConfig(data, config);
  const plot = new DualLine(dom, {
    ...baseComboConfig,
    xField: 'time',
    yField: ['value', 'count'],
    data,
    ...plotConfig,
    ...config,
  });

  plot.render();
  return plot;
};

export default createSingleChart(createDualLinePlot, {
  configFormat: getColumnLineConfig,
});
