/*
 * @文件描述: 基础玫瑰图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-28 16:12:38
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-07 15:21:13
 */

import { chartColorArr, baseMarker, baseLegendColor } from '../../config';
import { RoseConfig, PlotConfig } from '@antv/g2plot';
import CustomBase from '../base';
import { MarkerCfg } from '@antv/g2/lib/interface';

export interface CustomRoseConfig extends Partial<RoseConfig>, PlotConfig {
  // 是否为半圆
  layout?: 'all' | 'half';
  // 是否空心
  emptyInside?: boolean;
  // 是否显示轴
  hasAxis?: boolean;
}

class CustomDonutRose extends CustomBase<CustomRoseConfig> {
  constructor(container: HTMLElement, props: CustomRoseConfig) {
    super(container, props);
    this.chart.padding = [-50, 0, 0, 50];
    this.init();
  }

  public init() {
    const {
      data = [],
      radiusField = 'value',
      colorField = 'type',
      layout = 'all',
      emptyInside = true,
      hasAxis = false,
    } = this.props;
    this.chart
      .data(data)
      .annotation()
      .region({ start: [0, 0], end: [0, 100] }).line;
    this.chart
      .interval()
      .position(`${colorField}*${radiusField}`)
      .color(colorField, chartColorArr);
    this.chart.coordinate('polar', {
      innerRadius: emptyInside ? 0.35 : 0,
      startAngle: layout === 'half' ? Math.PI : 0, // 起始角度
      endAngle: layout === 'half' ? 0 : 2 * Math.PI, // 结束角度
    });
    this.chart.legend({
      position: 'bottom-left',
      flipPage: false,
      marker: baseMarker as MarkerCfg,
      itemName: baseLegendColor,
    });
    this.chart.axis(hasAxis);
    this.chart.interaction('element-highlight');
  }

  public render() {
    this.chart.render();
  }
}

export default CustomDonutRose;
