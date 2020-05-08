/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-30 11:07:21
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-06 16:06:50
 */
import { PlotConfig } from '@antv/g2plot/lib/base/plot';
import { ViewConfig } from '@antv/g2plot';
import CustomBase from '../base';

export interface CustomGroupedBarConfig extends ViewConfig, PlotConfig {
  groupField?: string;
}

class CustomGroupedBar extends CustomBase<CustomGroupedBarConfig> {
  constructor(container: HTMLElement, props: CustomGroupedBarConfig) {
    super(container, props);
    this.init();
  }

  private init() {
    const {
      data = [],
      xField = '',
      yField = '',
      groupField = 'type',
      xAxis = {},
      yAxis = {},
      color = [
        'l(0) 0:rgba(236, 103, 37, 1) 1:rgba(254, 176, 30, 1)',
        'l(0) 0:rgba(24, 137, 243, 1) 1:rgba(0, 210, 255, 1)',
      ],
    } = this.props;
    this.chart.data(data);
    this.chart.scale(xField, { nice: true });
    this.chart.legend({
      position: 'bottom',
    });

    this.chart.axis(yField, { ...yAxis, grid: null });

    this.chart.facet('mirror', {
      fields: [groupField],
      padding: [0, 30, 20, 30],
      transpose: true,
      showTitle: false,
      eachView: (view, facet) => {
        const facetIndex = facet?.columnIndex;
        if (facetIndex === 0) {
          view.axis(xField, {
            position: 'bottom',
            label: {
              ...xAxis.label,
              offset: 30,
              style: { textAlign: 'center' },
            },
            tickLine: {
              alignTick: false,
              length: 0,
            },
            line: null,
          });
        } else {
          view.axis(xField, false);
        }
        const colorStr = facetIndex === 0 ? color[0] : color[1];
        view
          .interval()
          .position(`${xField}*${yField}`)
          .color(colorStr)
          .shape('border-radius');
      },
    });
  }

  public render() {
    this.chart.render();
  }
}

export default CustomGroupedBar;
