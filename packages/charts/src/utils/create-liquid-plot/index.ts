/*
 * @文件描述: 水波图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 20:01:38
 */
import { Liquid, LiquidConfig } from '@antv/g2plot';
import { PlotCreateProps, basePieConfig, themeConfig } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface CustomLiquidConfig extends Partial<LiquidConfig> {
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
  formatConfig?: (config: CustomLiquidConfig) => CustomLiquidConfig,
) => {
  const transformedConfig = formatConfig ? formatConfig(config || {}) : config;
  const { fixedNumber = 0, suffix = '%' } = transformedConfig || {};
  const liquidThemeConfig = themeConfig.liquidConfig;
  return {
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
  } as LiquidConfig;
};

const createLiquidPlot = ({ dom, data, config, formatConfig }: LiquidPlotCreateProps) => {
  const { fixedNumber, suffix, ...restConfig } = config || {};
  const liquidPlot = new Liquid(
    dom,
    formatMergeConfig<LiquidConfig>(
      getOriginConfig(data, config, formatConfig),
      restConfig,
      formatConfig,
    ),
  );

  liquidPlot.render();
  return liquidPlot;
};

export default createSingleChart<CustomLiquidConfig, number, Liquid>(createLiquidPlot, {
  getOriginConfig,
});
