/*
 * @文件描述: 区间柱状图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 17:11:09
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 19:06:24
 */
import { RangeColumn, RangeColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, colors, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  label: { visible: false },
  data,
  color: colors[0],
});

const createRangeColumnPlot = ({
  dom,
  data,
  config = {},
  formatConfig,
}: PlotCreateProps<RangeColumnConfig>) => {
  const plot = new RangeColumn(
    dom,
    formatMergeConfig<RangeColumnConfig>(getOriginConfig(data), config, formatConfig),
  );

  plot.render();
  return plot;
};

export default createSingleChart<RangeColumnConfig, DataItem[], RangeColumn>(
  createRangeColumnPlot,
  { getOriginConfig },
);
