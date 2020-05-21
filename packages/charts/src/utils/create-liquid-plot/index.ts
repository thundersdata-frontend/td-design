/*
 * @文件描述: 水波图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 于效仟
 * @LastEditTime: 2020-05-21 18:01:57
 */
import { Liquid, LiquidConfig } from '@antv/g2plot';
import { PlotCreateProps, basePieConfig, themeConfig, theme } from '../../config';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type LiquidPlotCreateProps = Merge<PlotCreateProps<Partial<LiquidConfig>>, { data: number }>;

const createLiquidPlot = ({ dom, data, config }: LiquidPlotCreateProps) => {
  const liquidThemeConfig = themeConfig[theme].liquidConfig;
  const liquidPlot = new Liquid(dom, {
    ...basePieConfig,
    color: '#10ADF9',
    padding: [0, 0, 30, -50],
    min: 0,
    max: 100,
    value: data,
    liquidStyle: {
      stroke: '#00BBFF',
    },
    statistic: {
      adjustColor: false,
      style: {
        fill: liquidThemeConfig.statistic.fill,
        fontSize: 24,
      },
      formatter: value => `${value}%`,
    },
    ...config,
  });
  liquidPlot.render();
};
export default createLiquidPlot;
