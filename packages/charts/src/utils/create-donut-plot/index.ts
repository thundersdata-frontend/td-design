/*
 * @文件描述: 基础环图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-15 15:01:13
 */
import { Donut, RingConfig, DataItem } from '@antv/g2plot';
import { DonutViewConfig } from '@antv/g2plot/lib/plots/donut/layer';
import {
  PlotCreateProps,
  chartColorArr,
  basePieConfig,
  baseLegendColor,
  theme,
  themeConfig,
} from '../../config';

export interface CustomRingConfig extends Partial<RingConfig> {
  // 是否为单例图,如果是单例图，data必须要是number类型（传入百分比）
  isSingle?: boolean;
  // 数据名称
  titleName?: string;
  // 多例图下，扇形间是否有黑色间隔
  bordered?: boolean;
}

interface DonutConfigProps {
  titleName: string;
  isSingle: boolean;
  bordered: boolean;
}

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type RingPlotCreateProps = Merge<
  PlotCreateProps<CustomRingConfig>,
  { data: number | DataItem[] }
>;

/**
 * @功能描述: 得到不同类型图表配置
 * @参数: @param:data:单例图表数据，@param:config:图表配置
 * @返回值: 图表配置
 */
const getDonutConfig = (data: number | DataItem[], config: DonutConfigProps) => {
  const { titleName, isSingle, bordered } = config;
  let formatedData = '' + data;
  if (isSingle) {
    formatedData = (data as number).toFixed(1);
  }
  const donutConfig = {
    single: {
      color: ['rgba(0, 187, 255, 1)', 'rgba(13, 37, 67, 1)'],
      lineWidth: 0,
      statistic: {
        visible: true,
        /** 触发显示的事件 */
        triggerOn: 'none',
        /** 触发隐藏的事件 */
        triggerOff: 'none',
        htmlContent: () => {
          return `<div>
            <div class="ring-guide-name">${titleName}</div>
            <div class="ring-guide-value">${formatedData}<span class="percent-sign">%</span></div>
          </div>`;
        },
      },
    },
    default: {
      color: chartColorArr,
      lineWidth: bordered ? 6 : 0,
      statistic: {
        visible: true,
      },
    },
  };
  return donutConfig[isSingle ? 'single' : 'default'];
};

const createDonutPlot = ({ dom, data, config }: RingPlotCreateProps) => {
  const donutThemeConfig = themeConfig[theme].donutConfig;
  const { isSingle = false, bordered = true, titleName = '图例' } = config || {};
  const plotConfig = getDonutConfig(data, { titleName, isSingle, bordered });
  let newData = data as DataItem[];
  if (isSingle) {
    const dataNumber = data as number;
    newData = [
      { value: dataNumber, type: titleName },
      { value: 100 - dataNumber, type: '空' },
    ];
  }
  const donutChart = new Donut(dom, {
    ...basePieConfig,
    radius: 1,
    innerRadius: 0.8,
    data: newData,
    angleField: 'value',
    colorField: 'type',
    color: plotConfig.color,
    statistic: plotConfig.statistic as DonutViewConfig['statistic'],
    label: {
      visible: false,
    },
    pieStyle: {
      stroke: donutThemeConfig.stroke,
      lineWidth: plotConfig.lineWidth,
      style: {
        marginTop: -10,
      },
    },
    legend: {
      position: 'bottom-center',
      flipPage: false,
      text: {
        ...baseLegendColor,
        formatter: txt => {
          if (txt !== '空') {
            return txt;
          }
          return '';
        },
      },
      title: {
        visible: false,
      },
    },
    ...config,
  });
  donutChart.render();
};

export default createDonutPlot;
