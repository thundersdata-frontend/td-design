/*
 * @文件描述: 水波图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-20 21:12:20
 */
import { Liquid, LiquidConfig } from '@antv/g2plot';
import { PlotCreateProps, basePieConfig, themeConfig } from '../../config';
import { createSingleChart } from '../../baseUtils/chart';

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
  const liquidThemeConfig = themeConfig.liquidConfig;
  const liquidPlot = new Liquid(dom, {
    ...basePieConfig,
    color: '#10ADF9',
    padding: [0, 0, 10, 0],
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

export default createSingleChart(createLiquidPlot);
