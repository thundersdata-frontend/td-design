/*
 * @文件描述: 分组柱状图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 16:43:00
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 18:58:11
 */
import { GroupedColumn, GroupedColumnConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps, colors, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  xField: 'date',
  yField: 'value',
  groupField: 'type',
  data,
  color: colors,
});

const createGroupColumnPlot = ({
  dom,
  data,
  config = {},
  replaceConfig,
}: PlotCreateProps<Partial<GroupedColumnConfig>>) => {
  const plot = new GroupedColumn(
    dom,
    formatMergeConfig<GroupedColumnConfig>(getOriginConfig(data), config, replaceConfig),
  );

  plot.render();
  return plot;
};

export default createSingleChart<Partial<GroupedColumnConfig>, DataItem[], GroupedColumn>(
  createGroupColumnPlot,
  {
    getOriginConfig,
  },
);
