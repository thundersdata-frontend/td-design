import * as echarts from 'echarts/core';
import {
  GridComponentOption,
  LegendComponentOption,
  SingleAxisComponentOption,
  TooltipComponentOption,
} from 'echarts/components';
import { useMemo } from 'react';

import useTheme from './useTheme';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption | SingleAxisComponentOption
>;

/**
 * 柱状图的基础配置，如坐标轴样式、文字样式、tooltip样式等
 */
export default function useBaseChartConfig(inModal = false, unit?: string) {
  const theme = useTheme();
  const option: ECOption = useMemo(
    () => ({
      legend: {
        top: 0,
        right: '1%',
        itemWidth: inModal ? 16 : 12,
        itemHeight: inModal ? 16 : 12,
        textStyle: {
          color: theme.colors.gray100,
          ...theme.typography[inModal ? 'p0' : 'p2'],
        },
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: 10,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        className: 'echarts-tooltip',
        padding: 0,
        borderWidth: 0,
        backgroundColor: 'transparent',
        axisPointer: {
          lineStyle: {
            color: theme.colors.assist200,
            opacity: 0.5,
          },
          shadowStyle: {},
          crossStyle: {},
        },
        formatter: function (params: any) {
          const strs = params
            .filter((i: any) => i.seriesName && !i.seriesName.includes('series'))
            .map((item: any) => {
              const value =
                item.data && typeof item.data === 'object' && 'value' in item.data ? item?.data?.value : item?.data;
              return `
                <div style="display: flex; align-items: center;">
                  <div style="
                    width: 7px;
                    height: 7px;
                    background: linear-gradient(180deg, ${item?.color?.colorStops?.[0]?.color} 0%, ${
                item?.color?.colorStops?.[1]?.color
              } 100%);
                    margin-right: 4px;
                    border-radius: 7px;
                  "></div>
                  ${item?.seriesName}：${value} ${unit ?? item?.data?.unit ?? ''}
                </div>
              `;
            });
          return `
            <div style="
              background: linear-gradient(180deg, rgba(18, 81, 204, 0.9) 0%, rgba(12, 49, 117, 0.9) 100%);
              border: 1px solid #017AFF;
              color: #fff;
              font-size: ${inModal ? '18px' : '14px'};
              line-height: ${inModal ? '25px' : '22px'};
              padding: 5px;
              border-radius: 6px;
            ">
              <div>${params?.[0]?.name}</div>
              ${strs.join('')}
            </div>
          `;
        },
      },
      xAxis: {
        type: 'category',
        nameLocation: 'end',
        nameTextStyle: {
          ...theme.typography[inModal ? 'p0' : 'p2'],
          color: theme.colors.gray100,
        },
        axisLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: theme.colors.gray200,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          ...theme.typography[inModal ? 'p0' : 'p2'],
          color: theme.colors.gray100,
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
        nameLocation: 'end',
        nameTextStyle: {
          ...theme.typography[inModal ? 'p0' : 'p2'],
          color: theme.colors.gray100,
        },
        axisLine: {
          show: false,
          lineStyle: {
            width: 1,
            color: theme.colors.gray200,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          ...theme.typography[inModal ? 'p0' : 'p2'],
          color: theme.colors.gray100,
        },
        splitLine: {
          lineStyle: {
            width: 1,
            color: theme.colors.gray200,
          },
        },
      },
    }),
    [inModal, theme.colors.assist200, theme.colors.gray100, theme.colors.gray200, theme.typography, unit]
  );

  return option;
}
