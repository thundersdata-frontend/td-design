/*
 * @文件描述: 普通折线图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 13:56:23
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 19:00:39
 */
import { Line, LineConfig } from '@antv/g2plot';
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

const createLinePlot = ({ dom, data, config = {}, formatConfig }: PlotCreateProps<LineConfig>) => {
  const plot = new Line(
    dom,
    formatMergeConfig<LineConfig>(getOriginConfig(data), config, formatConfig),
  );

  plot.render();
  return plot;
};

export default createSingleChart<LineConfig, DataItem[], Line>(createLinePlot, { getOriginConfig });
