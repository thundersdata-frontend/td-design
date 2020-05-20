/*
 * @文件描述: 瀑布图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-28 09:46:33
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-18 16:08:16
 */
import { Waterfall, WaterfallConfig } from '@antv/g2plot';
import { baseConfig, PlotCreateProps } from '../../config';

export default ({ dom, data, config }: PlotCreateProps<WaterfallConfig>) => {
  const plot = new Waterfall(dom, {
    ...baseConfig,
    data,
    label: { visible: false },
    showTotal: { visible: false, label: '' },
    color: {
      rising: 'rgba(216, 30, 25, 1)',
      falling: 'rgba(73, 213, 18, 1)',
      total: 'rgba(73, 213, 18, 0)',
    },
    ...config,
  });

  plot.render();
};
