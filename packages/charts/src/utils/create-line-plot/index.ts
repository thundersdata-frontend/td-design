/*
 * @文件描述: 普通折线图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 13:56:23
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-01-27 17:14:39
 */
import { Line, LineOptions } from '@antv/g2plot';
import { PlotCreateProps, baseConfig, colors, basePoint, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) => ({
  ...baseConfig,
  data,
  lineStyle: {
    lineWidth: 1,
  },
  point: basePoint,
  color: colors,
});

const createLinePlot = ({ dom, data, config = {}, replaceConfig }: PlotCreateProps<Partial<LineOptions>>) => {
  const plot = new Line(dom, formatMergeConfig<LineOptions>(getOriginConfig(data), config, replaceConfig));

  plot.render();
  return plot;
};

export default createSingleChart<LineOptions, DataItem[], Line>(createLinePlot, { getOriginConfig });
