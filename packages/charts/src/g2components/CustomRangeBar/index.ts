/*
 * @文件描述: 区间条形图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-29 17:36:52
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-04-30 11:59:33
 */
import { PlotConfig } from '@antv/g2plot/lib/base/plot';
import { ViewConfig } from '@antv/g2plot';
import CustomBase from '../base';

export interface CustomRangeBarConfig extends ViewConfig, PlotConfig {}

class CustomRangeBar extends CustomBase<CustomRangeBarConfig> {
  constructor(container: HTMLElement, props: CustomRangeBarConfig) {
    super(container, props);
    this.chart.padding = [0, 0, 20, 0];
    this.init();
  }

  private init() {
    const {
      data = [],
      xField = '',
      yField = '',
      xAxis = {},
      color = 'l(0) 0:rgba(24, 137, 243, 1) 1:rgba(0, 210, 255, 1)',
    } = this.props;
    // 找出数据最大值 并按百分比增加
    const max =
      (data.length > 0 ? Math.max(...data.map(item => +((item[yField] || [])[1] || ''))) : 0) * 1.2;
    const newData = data.map(item => ({ ...item, baseRange: [0, max] }));
    this.chart.data(newData);
    this.chart.scale(xField, { nice: true });
    this.chart.coordinate().transpose();
    this.chart.legend(false);

    // axis config
    this.chart.axis(xField, {
      ...xAxis,
      label: {
        ...xAxis?.label,
        style: {
          ...xAxis?.label?.style,
          textAlign: 'left',
          x: 5,
        },
      },
    });
    this.chart.axis(yField, false);
    this.chart.axis('baseRange', false);
    this.chart
      .interval()
      .position(`${xField}*baseRange`)
      .color('rgba(0, 187, 255, 0.1)')
      .shape('border-radius');

    this.chart
      .interval()
      .position(`${xField}*${yField}`)
      .color(color)
      .tooltip(yField)
      .shape(`${xField}*${yField}`, (_, val) => {
        if (val === 0) {
          return '';
        }
        return 'border-radius';
      });

    this.chart.interaction('active-region');
  }

  public render() {
    this.chart.render();
  }
}

export default CustomRangeBar;
