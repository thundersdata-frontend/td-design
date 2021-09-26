import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  PictorialBarChart,
  // 系列类型的定义后缀都为 SeriesOption
  PictorialBarSeriesOption,
} from 'echarts/charts';
import {
  TooltipComponent,
  TooltipComponentOption,
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
  SingleAxisComponent,
  SingleAxisComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { merge } from 'lodash-es';

import createLinearGradient from '../../utils/createLinearGradient';
import { TooltipOption } from 'echarts/types/dist/shared';
import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useChartLoop from '../../hooks/useChartLoop';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  PictorialBarSeriesOption | TooltipComponentOption | GridComponentOption | SingleAxisComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, SingleAxisComponent, PictorialBarChart, CanvasRenderer]);

/**
 * 片状体柱状图，对应figma柱状图3
 */
export default ({
  unit,
  max,
  xAxisData,
  name,
  data,
  style,
  autoLoop,
  duration = 2000,
  config,
  inModal = false,
}: {
  unit?: string;
  xAxisData: SingleAxisComponentOption['data'];
  name?: string;
  max: number;
  data: (number | { name: string; value: number })[];
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  config?: ECOption;
  inModal?: boolean;
}) => {
  const theme = useTheme();
  const baseChartConfig = useBaseChartConfig(inModal);
  const echartsRef = useChartLoop(xAxisData, autoLoop, duration);

  const option = useMemo(() => {
    return merge(
      {
        legend: {
          ...baseChartConfig.legend,
        },
        grid: {
          ...baseChartConfig.grid,
        },
        tooltip: {
          ...baseChartConfig.tooltip,
          axisPointer: {
            ...(baseChartConfig.tooltip as TooltipOption).axisPointer,
            type: 'shadow',
          },
          formatter: function (params: any) {
            const str = `
            <div style="display: flex; align-items: center;">
              <div style="
                width: 7px;
                height: 7px;
                background: linear-gradient(180deg, ${params[0]?.color?.colorStops?.[0]?.color} 0%, ${
              params[0]?.color?.colorStops?.[1]?.color
            } 100%);
                margin-right: 4px;
                border-radius: 7px;
              "></div>
              ${params[0]?.seriesName}：${params[0]?.data?.value || params[0]?.data} ${params[0]?.data?.unit ?? ''}
            </div>
          `;

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
                  <div>${params[0]?.name}</div>
                  ${str}
                </div>
              `;
          },
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          ...baseChartConfig.xAxis,
        },
        yAxis: {
          name: unit,
          ...baseChartConfig.yAxis,
        },
        series: [
          {
            name,
            type: 'pictorialBar',
            silent: true,
            itemStyle: {
              color: createLinearGradient(theme.colors.primary50),
            },
            symbolRepeat: 'fixed',
            symbolMargin: 2,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [16, 2],
            symbolPosition: 'start',
            symbolBoundingData: max,
            data,
            z: 2,
            animationEasing: 'elasticOut',
          },
          {
            name,
            type: 'pictorialBar',
            itemStyle: {
              color: createLinearGradient(theme.colors.primary100),
              opacity: 0.2,
            },
            symbolRepeat: 'fixed',
            symbolMargin: 2,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [16, 2],
            symbolPosition: 'start',
            symbolBoundingData: max,
            data: data.map(() => max),
            z: 1,
            animationEasing: 'elasticOut',
          },
        ],
      },
      config
    ) as ECOption;
  }, [
    baseChartConfig.legend,
    baseChartConfig.grid,
    baseChartConfig.tooltip,
    baseChartConfig.xAxis,
    baseChartConfig.yAxis,
    xAxisData,
    unit,
    name,
    theme.colors.primary50,
    theme.colors.primary100,
    max,
    data,
    config,
    inModal,
  ]);

  return <ReactEcharts ref={echartsRef} echarts={echarts} option={option} style={style} />;
};
