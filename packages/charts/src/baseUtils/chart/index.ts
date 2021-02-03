/*
 * @文件描述: 图表包装方法 HOC
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-06-21 22:40:19
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 11:32:14
 */

import { isEqual } from 'lodash-es';

interface SingleChartHOCConfig<T, U, P> {
  /** 状态管理绑定函数 */
  stateManagerFunc?: (chart: P, data: U, config?: T) => void;
  /** 获得原始配置的方法 */
  getOriginConfig?: (data: U, config?: T, replaceConfig?: (config: Partial<T>) => Partial<T>) => T;
}

/**
 * @功能描述: 图表配置合并方法，用targetConfig上的属性替换originConfig上的对应属性并得到最后的对象(增量复写)
 * @参数: originConfig 原配置，targetConfig：目标配置
 * @返回值: 返回合并后的 config
 */
export const mergeConfig = <T>(originConfig: Partial<T>, targetConfig: Partial<T>) => {
  const modifiedObj = Object.assign({}, originConfig, targetConfig);
  Object.keys(modifiedObj).forEach(key => {
    // 如果是 originConfig，targetConfig上都有的属性且为对象,再合并一次
    if (
      originConfig[key] &&
      targetConfig[key] &&
      typeof targetConfig[key] === 'object' &&
      !Array.isArray(targetConfig[key])
    ) {
      modifiedObj[key] = mergeConfig(originConfig[key], targetConfig[key]);
    }
  });
  return modifiedObj;
};

/**
 * @功能描述: 图表配置加工方法，如果不传 replaceConfig 使用 mergeConfig 方法增量复写配置，
 * 如果传 replaceConfig 则使用全量替换，此时传入的 config 将会是全量替换，
 * @参数: originConfig 原配置，targetConfig：目标配置，replaceConfig：配置格式化函数
 * @返回值: 返回格式化加工后的 config
 */
export const formatMergeConfig = <T>(
  originConfig: T,
  targetConfig: Partial<T>,
  replaceConfig?: (config: Partial<T>) => Partial<T>
) => {
  // 使用自定义配置函数
  if (replaceConfig) {
    return replaceConfig({
      ...originConfig,
      ...targetConfig,
    }) as T;
  }
  return mergeConfig<T>(originConfig, targetConfig) as T;
};

/**
 * 图表包装方法 HOC
 * 用于更新图表 config 并防止重复渲染
 * 注：返回 render 方法时需要 bind(实例名)否则无 this
 */
export class SingleChartHOC<T, U, P> {
  private dataArr: U[] = [];

  private chartPlotArr: any[] = [];

  private getDom: ({
    dom,
    data,
    config,
    replaceConfig,
  }: {
    dom: HTMLElement;
    data: U;
    config?: T;
    replaceConfig?: (config: Partial<T>) => Partial<T>;
  }) => P;

  private stateManagerFunc: ((chart: P, data: U, config?: T) => void) | null;

  private getOriginConfig: ((data: U, config?: T, replaceConfig?: (config: Partial<T>) => Partial<T>) => T) | null;

  private domArr: HTMLElement[] = [];

  constructor(
    getDom: ({
      dom,
      data,
      config,
      replaceConfig,
    }: {
      dom: HTMLElement;
      data: U;
      config?: T;
      replaceConfig?: (config: Partial<T>) => Partial<T>;
    }) => P,
    config?: SingleChartHOCConfig<T, U, P>
  ) {
    const { stateManagerFunc = null, getOriginConfig = null } = config || {};
    this.getDom = getDom;
    this.stateManagerFunc = stateManagerFunc;
    this.getOriginConfig = getOriginConfig;
  }

  render({
    dom,
    data,
    config,
    replaceConfig,
  }: {
    dom: HTMLElement;
    data: U;
    config?: T;
    replaceConfig?: (config: Partial<T>) => Partial<T>;
  }) {
    const idx = this.domArr.findIndex(item => item === dom);
    if (idx === -1) {
      // 初次渲染图表
      const plot = this.getDom({ dom, data, config, replaceConfig });
      this.chartPlotArr.push(plot);
      this.dataArr.push(data);
      this.domArr.push(dom);
      return plot;
    }
    if (!isEqual(this.dataArr[idx], data)) {
      this.dataArr[idx] = data;
      // 经过图表方法内部的格式化后的原始配置
      const originConfig = this.getOriginConfig ? this.getOriginConfig(data, config, replaceConfig) : ({} as T);
      // 更新 config 并重新加载图表
      this.chartPlotArr[idx].updateConfig({
        data,
        // 使用外部传入的 replaceConfig 方法再次 format
        ...formatMergeConfig(originConfig, config || {}, replaceConfig),
      });
      this.chartPlotArr[idx].render();
      // 绑定状态管理函数
      if (this.stateManagerFunc) {
        this.stateManagerFunc(this.chartPlotArr[idx], data, config);
      }
    }
    return this.chartPlotArr[idx];
  }
}

/**
 *  生成图表的渲染函数
 *  @param getDom：各种图表 create 方法
 *  @param config：图表 data 格式化，状态机管理等图表配置
 */
export const createSingleChart = <T, U, P>(
  getDom: ({
    dom,
    data,
    config,
    replaceConfig,
  }: {
    dom: HTMLElement;
    data: U;
    config?: T;
    replaceConfig?: (config: Partial<T>) => Partial<T>;
  }) => P,
  chartConfig?: SingleChartHOCConfig<T, U, P>
): (({
  dom,
  data,
  config,
  replaceConfig,
}: {
  dom: HTMLElement;
  data: U;
  config?: T;
  replaceConfig?: (config: Partial<T>) => Partial<T>;
}) => P) => {
  const newChart = new SingleChartHOC<T, U, P>(getDom, chartConfig);
  return newChart.render.bind(newChart);
};
