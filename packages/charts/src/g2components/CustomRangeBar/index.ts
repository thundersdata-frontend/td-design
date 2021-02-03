/*
 * @文件描述: 区间条形图
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-29 17:36:52
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 00:27:20
 */
import CustomBase from '../base';
import { TemplateOptions } from '@antv/g2plot/lib/plots/_template';
import { DataItem } from '../../config';
import { AxisCfg } from '@antv/g2/lib/interface';

export interface CustomRangeBarConfig extends Omit<Partial<TemplateOptions>, 'xAxis' | 'color'> {
  groupField?: string;
  // 条形高度
  barSize?: number | 'auto';
  // 条形宽度范围，只有在barSize为'auto'时生效
  barSizeRange?: [number, number];
  xAxis?: AxisCfg;
  color?: string;
}

// 处理得到自适应的barSize
const getBarSize = (data: DataItem[], barSizeRange: [number, number]) => {
  // 默认的柱子个数范围
  const countRange = [1, 8];
  // 参考的柱子个数
  let countNumber = data.length;
  if (countNumber > countRange[1]) {
    [, countNumber] = countRange;
  }
  if (countNumber < countRange[0]) {
    [countNumber] = countRange;
  }
  const formatedBarSize = Math.floor(
    barSizeRange[1] +
      ((barSizeRange[0] - barSizeRange[1]) / (countRange[1] - countRange[0])) * (countNumber - countRange[0])
  );
  return formatedBarSize;
};

class CustomRangeBar extends CustomBase<CustomRangeBarConfig> {
  constructor(container: HTMLElement, props: CustomRangeBarConfig) {
    super(container, props);
    this.init();
  }

  private init() {
    const {
      data = [],
      xField = '',
      yField = '',
      xAxis = {},
      color = 'l(0) 0:rgba(24, 137, 243, 1) 1:rgba(0, 210, 255, 1)',
      barSize = 'auto',
      barSizeRange = [14, 30],
      padding = [0, 0, 10, 0],
    } = this.props;
    // 找出数据最大值 并按百分比增加
    const max = (data.length > 0 ? Math.max(...data.map(item => +((item[yField] || [])[1] || ''))) : 0) * 1.2;
    const newData = data.map(item => ({ ...item, baseRange: [0, max] }));
    const fomattedBarSize = barSize === 'auto' ? getBarSize(data, barSizeRange) : barSize;
    this.chart.padding = typeof padding === 'string' ? +padding : padding;
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
      .shape('border-radius')
      .size(fomattedBarSize);

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
      })
      .size(fomattedBarSize);

    this.chart.interaction('active-region');
  }

  public render() {
    this.chart.render();
  }

  // 更新数据
  public updateConfig(config: TemplateOptions) {
    const { data = [] } = config;
    this.chart.changeData(data);
  }
}

export default CustomRangeBar;
