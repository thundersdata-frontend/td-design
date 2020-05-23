/*
 * @文件描述: 普通折线图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 13:56:23
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-23 17:27:39
 */
import { Line, LineConfig } from '@antv/g2plot';
import { PlotCreateProps, baseConfig, colors, basePoint } from '../../config';

export default ({ dom, data, config = {} }: PlotCreateProps<LineConfig>) => {
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
