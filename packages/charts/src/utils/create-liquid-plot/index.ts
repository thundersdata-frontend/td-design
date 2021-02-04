/*
 * @文件描述: 水波图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 00:12:57
 */
import { Liquid, LiquidOptions } from '@antv/g2plot';
import { PlotCreateProps, basePieConfig, themeConfig } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomLiquidConfig extends Partial<LiquidOptions> {
  // 精确位数
  fixedNumber?: number;
  // 后缀
  suffix?: string;
}

export type LiquidPlotCreateProps = Merge<PlotCreateProps<CustomLiquidConfig>, { data: number }>;

/** 获得原始配置 */
const getOriginConfig = (
  data: number,
  config?: CustomLiquidConfig,
  replaceConfig?: (config: CustomLiquidConfig) => CustomLiquidConfig
) => {
  const transformedConfig = replaceConfig ? replaceConfig(config || {}) : config;
  const { fixedNumber = 0, suffix = '%' } = transformedConfig || {};
  const liquidThemeConfig = themeConfig.liquidConfig;
  return {
    ...basePieConfig,
    color: '#10ADF9',
    padding: [0, 0, 10, 0],
    min: 0,
    max: 100,
    percent: data,
    liquidStyle: {
      stroke: '#00BBFF',
    },
    statistic: {
      adjustColor: false,
      style: {
        fill: liquidThemeConfig.statistic.fill,
        fontSize: 24,
      },
      formatter: (value: number) => value.toFixed(fixedNumber) + suffix,
    },
  } as LiquidOptions;
};

const createLiquidPlot = ({ dom, data, config, replaceConfig }: LiquidPlotCreateProps) => {
  const { fixedNumber, suffix, ...restConfig } = config || {};
  const liquidPlot = new Liquid(
    dom,
    formatMergeConfig<LiquidOptions>(getOriginConfig(data, config, replaceConfig), restConfig, replaceConfig)
  );

  liquidPlot.render();
  return liquidPlot;
};

export default createSingleChart<CustomLiquidConfig, number, Liquid>(createLiquidPlot, {
  getOriginConfig,
});
