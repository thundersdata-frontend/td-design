/*
 * @文件描述: 普通折线图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 13:56:23
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-22 10:12:16
 */
import { Line, LineConfig } from '@antv/g2plot';
import { PlotCreateProps, baseConfig, colors, basePoint } from '../../config';
import { createSingleChart } from '../../baseUtils/chart';

const createLinePlot = ({ dom, data, config = {} }: PlotCreateProps<LineConfig>) => {
  const plot = new Line(dom, {
    ...baseConfig,
    data,
    lineStyle: {
      lineWidth: 1,
    },
    point: basePoint,
    color: colors,
    ...config,
  });

  plot.render();
  return plot;
};

export default createSingleChart(createLinePlot);
