/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-30 10:28:41
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 19:27:03
 */
import { Chart } from '@antv/g2';

export default class CustomBase<T> {
  public chart: Chart;

  protected containerDOM: HTMLElement;

  protected props: T;

  constructor(container: HTMLElement, props: T) {
    this.containerDOM = typeof container === 'string' ? document.getElementById(container)! : container;
    this.props = props;
    this.chart = new Chart({
      container: this.containerDOM,
      autoFit: true,
    });
    // 隐藏高亮圆点
    this.chart.tooltip({
      showMarkers: false,
    });
  }
}
