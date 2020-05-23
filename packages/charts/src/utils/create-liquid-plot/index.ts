/*
 * @文件描述: 水波图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-21 20:01:19
 */
import { Liquid, LiquidConfig } from '@antv/g2plot';
import { PlotCreateProps, basePieConfig, themeConfig, theme } from '../../config';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomLiquidConfig extends Partial<LiquidConfig> {
  // 精确位数
  fixedNumber?: number;
  // 后缀
  suffix?: string;
}

export type LiquidPlotCreateProps = Merge<PlotCreateProps<CustomLiquidConfig>, { data: number }>;

const createLiquidPlot = ({ dom, data, config }: LiquidPlotCreateProps) => {
  const { fixedNumber = 0, suffix = '%' } = config || {};
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
      formatter: value => value.toFixed(fixedNumber) + suffix,
    },
    ...config,
  });
  liquidPlot.render();
  return liquidPlot;
};
export default createLiquidPlot;
