/*
 * @文件描述: 基础条形图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-28 14:00:46
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 15:48:51
 */
import { ViewCfg, Options } from '@antv/g2/lib/interface';
import CustomBase from '../base';

export interface CustomBarConfig extends Partial<ViewCfg>, Partial<Options> {
  color?: string;
}

class CustomBar extends CustomBase<CustomBarConfig> {
  constructor(container: HTMLElement, props: CustomBarConfig) {
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
    const max = (data.length > 0 ? Math.max(...data.map(item => +(item[yField] || ''))) : 0) * 1.2;
    const newData = data.map(item => ({ ...item, max }));
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
    this.chart.axis('max', false);
    this.chart
      .interval()
      .position(`${xField}*max`)
      .color('rgba(0, 187, 255, 0.1)')
      .shape('border-radius')
      .label(yField, {
        style: {
          fill: 'rgba(0, 187, 255, 1)',
          textAlign: 'right',
        },
        offsetX: -15,
      });

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

  // 更新数据
  public updateConfig(config: Options) {
    const { data = [] } = config;
    this.chart.changeData(data);
  }
}

export default CustomBar;
