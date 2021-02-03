/*
 * @文件描述: 基础玫瑰图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-28 16:12:38
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 09:51:45
 */

import { TemplateOptions } from '@antv/g2plot/lib/plots/_template';
import { MarkerCfg, Options } from '@antv/g2/lib/interface';
import { chartColorArr, baseMarker, baseLegendColor } from '../../config';
import CustomBase from '../base';
import { AxisBaseCfg } from '@antv/component/lib/types';
import { AxisCfg } from '@antv/g2/lib/interface';

export interface CustomRoseConfig extends Omit<Partial<TemplateOptions>, 'xAxis'> {
  // 是否为半圆
  layout?: 'all' | 'half';
  // 是否空心
  emptyInside?: boolean;
  // 是否显示轴
  hasAxis?: boolean;
  // 图表内边距
  padding?: number[] | number;
  xAxis?: Partial<AxisBaseCfg>;
  yAxis?: AxisCfg;
  radiusField?: string;
  colorField?: string;
}

class CustomDonutRose extends CustomBase<CustomRoseConfig> {
  constructor(container: HTMLElement, props: CustomRoseConfig) {
    super(container, props);
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
      padding = layout === 'half' ? [-50, 0, 0, 50] : [-50, 0, 50, 0],
    } = this.props;
    this.chart.padding = padding;
    this.chart
      .data(data)
      .annotation()
      .region({ start: [0, 0], end: [0, 100] });
    this.chart.interval().position(`${colorField}*${radiusField}`).color(colorField, chartColorArr);
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

  // 更新数据
  public updateConfig(config: Options) {
    const { data = [] } = config;
    this.chart.changeData(data);
  }
}

export default CustomDonutRose;
