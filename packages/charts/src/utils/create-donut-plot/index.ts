/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-04 15:51:38
 */
import { Pie, PieOptions, Statistic } from '@antv/g2plot';
// import G2DonutLayer, { DonutViewConfig } from '@antv/g2plot/lib/plots/Pie/layer';
import { PlotCreateProps, chartColorArr, basePieConfig, baseLegendColor, themeConfig, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

// export type DonutLayer = G2DonutLayer;

export interface selectedItemProps {
  name: string;
  exp: string;
}

export interface CustomRingConfig extends Partial<PieOptions> {
  // 是否为单例图,如果是单例图，data必须要是number类型（传入百分比）
  isSingle?: boolean;
  // 数据名称
  titleName?: string;
  // 多例图下，扇形间是否有黑色间隔
  bordered?: boolean;
  // 是否有鼠标滑过圆环高亮突出事件
  hoverHighlight?: boolean;
}

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type RingPlotCreateProps = Merge<PlotCreateProps<CustomRingConfig>, { data: number | DataItem[] }>;

/**
 * @功能描述: 得到不同类型图表配置
 * @参数: @param:data:单例图表数据，@param:config:图表配置
 * @返回值: 图表配置
 */
const getDonutConfig = (data: number | DataItem[], config?: CustomRingConfig) => {
  const { isSingle = false, bordered = true, titleName = '图例' } = config || {};
  let formatedData = `${data}`;
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

// 格式化单例环图的数据
const singleDonutFormatData = (data: number | DataItem[], config?: CustomRingConfig) => {
  const { isSingle = false, titleName = '图例' } = config || {};
  return isSingle
    ? ([
        { value: data, type: titleName },
        { value: 100 - (data as number), type: '空' },
      ] as DataItem[])
    : (data as DataItem[]);
};

// 高亮圆环函数
// const highlightDount = (donutChart: Plot<any>, data: number | DataItem[], config?: CustomRingConfig) => {
//   const donutThemeConfig = themeConfig.donutConfig;
//   const { hoverHighlight = true, isSingle = false, bordered = true, titleName = '图例' } = config || {};
//   const plotConfig = getDonutConfig(data, { titleName, isSingle, bordered });
//   // 状态管理器
//   const stateManager = new StateManager();
//   const formatData = singleDonutFormatData(data, config);
//   // 圆环绑定高亮事件
//   if (!isSingle && hoverHighlight) {
//     donutChart.bindStateManager(stateManager, {
//       setState: [
//         {
//           event: 'ring:mouseenter',
//           state: (e: any) => {
//             const origin = e.target.get('origin').data;
//             const state = { name: 'type', exp: origin.type };
//             return state;
//           },
//         },
//         {
//           event: 'ring:mouseout',
//           state: () => {
//             const state = { name: 'type', exp: '' };
//             return state;
//           },
//         },
//       ],
//       onStateChange: [
//         {
//           name: 'type',
//           callback: (d: selectedItemProps, plot: DonutLayer) => {
//             const dataIndex = formatData.findIndex(item => item.type === d.exp);
//             plot.setSelected(d, {
//               stroke: plotConfig.color[dataIndex],
//               lineWidth: 10,
//               fillOpacity: 1,
//             });
//             plot.setDefault(
//               (origin: DataItem) => {
//                 return origin[d.name] !== d.exp;
//               },
//               {
//                 stroke: donutThemeConfig.stroke,
//                 lineWidth: !bordered || isSingle ? 0 : 6,
//               }
//             );
//           },
//         },
//       ],
//     });
//   }
// };

/** 获得原始配置 */
const getOriginConfig = (
  data: number | DataItem[],
  config?: CustomRingConfig,
  replaceConfig?: (config: CustomRingConfig) => CustomRingConfig
) => {
  const transformedConfig = replaceConfig ? replaceConfig(config || {}) : config;
  const donutThemeConfig = themeConfig.donutConfig;
  const plotConfig = getDonutConfig(data, transformedConfig);
  const newData = singleDonutFormatData(data as number, transformedConfig);
  return {
    ...basePieConfig,
    radius: 1,
    innerRadius: 0.8,
    data: newData as DataItem[],
    angleField: 'value',
    colorField: 'type',
    color: plotConfig.color,
    statistic: plotConfig.statistic as Statistic,
    label: {
      visible: false,
    },
    pieStyle: {
      stroke: donutThemeConfig.stroke,
      lineWidth: plotConfig.lineWidth,
    },
    legend: {
      position: 'bottom',
      flipPage: false,
      text: {
        ...baseLegendColor,
        formatter: (txt: string) => {
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
  } as PieOptions;
};

const createDonutPlot = ({ dom, data, config, replaceConfig }: RingPlotCreateProps) => {
  const { isSingle, bordered, titleName, hoverHighlight, ...restConfig } = config || {};

  const donutChart = new Pie(
    dom,
    formatMergeConfig<PieOptions>(getOriginConfig(data, config, replaceConfig), restConfig, replaceConfig)
  );

  donutChart.render();

  return donutChart;
};

export default createSingleChart<CustomRingConfig, number | DataItem[], Pie>(createDonutPlot, {
  getOriginConfig,
});
