/*
 * @文件描述: 图表包装方法 HOC
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-06-21 22:40:19
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-28 17:53:41
 */

import { isEqual } from 'lodash-es';
import { DataItem } from '../../config';

interface SingleChartHOCConfig {
  /** 状态管理绑定函数 */
  stateManagerFunc?: (chart: any, data: DataItem[], config?: any) => void;
  /** 对 data 的格式化处理 */
  dataFormat?: (data: any, config?: any) => any;
  /** 对 config 的格式化处理 */
  configFormat?: (data: any, config?: any) => any;
}

/**
 * 图表包装方法 HOC
 * 用于更新图表 config 并防止重复渲染
 * 注：返回 render 方法时需要 bind(实例名)否则无 this
 */
export class SingleChartHOC {
  private dataArr: any[] = [];

  private chartPlotArr: any[] = [];

  private getDom: any;

  private stateManagerFunc: ((chart: any, data: DataItem[], config?: any) => void) | null;

  private dataFormat: ((data: any, config?: any) => any) | null;

  private configFormat: ((data: any, config?: any) => any) | null;

  private domArr: HTMLElement[] = [];

  constructor(getDom: any, config?: SingleChartHOCConfig) {
    const { stateManagerFunc = null, dataFormat = null, configFormat = null } = config || {};
    this.getDom = getDom;
    this.stateManagerFunc = stateManagerFunc;
    this.dataFormat = dataFormat;
    this.configFormat = configFormat;
  }

  render({ dom, data, config }: { dom: HTMLElement; data: any; config: any }) {
    const idx = this.domArr.findIndex(item => item === dom);
    if (idx === -1) {
      // 初次渲染图表
      const plot = this.getDom({ dom, data, config });
      this.chartPlotArr.push(plot);
      this.dataArr.push(data);
      this.domArr.push(dom);
      return plot;
    }
    if (!isEqual(this.dataArr[idx], data)) {
      this.dataArr[idx] = data;
      // 更新 config 并重新加载图表
      this.chartPlotArr[idx].updateConfig({
        // 添加 config 格式化的属性
        ...(this.configFormat ? this.configFormat(data, config) : {}),
        // 对数据进行格式化
        data: this.dataFormat ? this.dataFormat(data, config) : data,
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
export const createSingleChart = (getDom: any, chartConfig?: SingleChartHOCConfig) => {
  const newChart = new SingleChartHOC(getDom, chartConfig);
  return newChart.render.bind(newChart);
};
