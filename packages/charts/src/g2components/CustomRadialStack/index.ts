/*
 * @文件描述: 径向堆叠柱形图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-30 13:59:35
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-24 10:41:36
 */
import { PlotConfig, PieConfig } from '@antv/g2plot';
import { Options } from '@antv/g2plot/lib/dependents';
import { MarkerCfg } from '@antv/g2/lib/interface';
import CustomBase from '../base';
import { baseMarker, baseLegendColor, themeConfig } from '../../config';
import { getColorArr } from '../../utils/create-stack-rose-plot';

export interface CustomRadialConfig extends Partial<PieConfig>, PlotConfig {
  color?: string[];
}

class CustomRadialStack extends CustomBase<CustomRadialConfig> {
  constructor(container: HTMLElement, props: CustomRadialConfig) {
    super(container, props);
    this.init();
  }

  public init() {
    const radialStackThemeConfig = themeConfig.radialStackConfig;
    const { emptyFillColor } = radialStackThemeConfig;
    const {
      data = [],
      colorField = 'type',
      angleField = 'value',
      color = ['#00D2FF', '#38B03B', '#FEB01E'],
    } = this.props;
    const sum = data
      .map(item => item[angleField])
      .reduce((total, number) => (total as number) + (number as number), 0) as number;
    const modifyData = data.map(item => {
      const percent = ((item[angleField] as number) * 100) / sum;
      return {
        [colorField]: item[colorField],
        color: item[colorField],
        [angleField]: percent,
      };
    });
    // 总共的颜色数
    const colorFieldCount = [...new Set(data.map(item => item[colorField]))].length;

    // 插入填充数据
    data.forEach(item => {
      const percent = ((item[angleField] as number) * 100) / sum;
      modifyData.unshift({
        [colorField]: item[colorField],
        color: '空',
        [angleField]: 100 - percent,
      });
    });

    // 转为圆环
    this.chart
      .coordinate('polar', {
        radius: 0.8,
        innerRadius: 0.3,
        startAngle: 0,
        endAngle: 1.5 * Math.PI,
      })
      .transpose();

    this.chart.data(modifyData);

    // 设置最大值
    this.chart.scale(angleField, {
      max: 100,
    });

    this.chart.legend({
      marker: baseMarker as MarkerCfg,
      itemName: baseLegendColor,
      position: 'bottom',
    });

    this.chart
      .interval()
      .adjust('stack')
      .position(`${colorField}*${angleField}`)
      .color('color', [emptyFillColor, ...getColorArr(color, colorFieldCount)])
      .size(10)
      .tooltip({
        fields: [angleField, 'color'],
        callback: (val, color) => {
          const percent = (color !== '空' ? val : 100 - val).toFixed(1);
          return {
            name: '占比',
            value: percent + '%',
          };
        },
      })
      .label('percent', {
        position: 'top',
        offset: 10,
        autoRotate: false,
        style: {
          fill: '#fff',
        },
        content: data => {
          if (data.color !== '空') {
            const percent = data[angleField].toFixed(1);
            return percent + '%';
          }
          return '';
        },
      });

    this.chart.interaction('element-highlight-by-x');
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

export default CustomRadialStack;
