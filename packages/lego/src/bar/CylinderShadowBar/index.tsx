import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  CustomChart,
  // 系列类型的定义后缀都为 SeriesOption
  CustomSeriesOption,
} from 'echarts/charts';
import {
  TooltipComponent,
  TooltipComponentOption,
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { SingleAxisComponentOption } from 'echarts';
import { merge } from 'lodash-es';

import createLinearGradient from '../../utils/createLinearGradient';
import { TooltipOption } from 'echarts/types/dist/shared';
import useTheme from '../../hooks/useTheme';
import useBaseBarConfig from '../../hooks/useBaseBarConfig';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useChartLoop from '../../hooks/useChartLoop';
import useStyle from '../../hooks/useStyle';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<CustomSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, CustomChart, CanvasRenderer]);

/**
 * 带阴影柱状堆叠图，对应figma柱状图2
 */
export default ({
  xAxisData,
  unit,
  name,
  data,
  max,
  style,
  autoLoop,
  duration = 2000,
  img,
  imgStyle,
  config,
}: {
  xAxisData: SingleAxisComponentOption['data'];
  unit?: string;
  name?: string;
  max: number;
  data: (number | { name: string; value: number })[];
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  img?: string;
  imgStyle?: CSSProperties;
  config?: ECOption;
}) => {
  const theme = useTheme();
  const baseBarConfig = useBaseBarConfig();
  const baseChartConfig = useBaseChartConfig();
  const echartsRef = useChartLoop(xAxisData, autoLoop, duration);
  const { style: modifiedStyle } = useStyle(style);

  const option = useMemo(() => {
    return merge(
      {
        color: [createLinearGradient(theme.colors.primary50)],
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
            console.log(params[0]);
            const str = `
            <div style="display: flex; align-items: center;">
              <div style="
                width: 7px;
                height: 7px;
                background: linear-gradient(180deg, ${params[0]?.color} 0%, ${params[0]?.color} 100%);
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
                  font-size: 14px;
                  line-height: 22px;
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
          max,
          ...baseChartConfig.yAxis,
        },
        series: [
          {
            name,
            type: 'pictorialBar',
            symbolSize: [20, 8],
            symbolOffset: [0, 4],
            z: 1,
            silent: true,
            color: theme.colors.assist700,
            data: data,
            animation: false,
            barGap: '-100%',
            barCateGoryGap: '-100%',
          },
          {
            name,
            type: 'bar',
            barWidth: 20,
            z: 2,
            data: data,
            animation: false,
          },
          {
            name,
            type: 'pictorialBar',
            symbolSize: [20, 8],
            symbolOffset: [0, -4],
            symbolPosition: 'end',
            z: 3,
            silent: true,
            color: createLinearGradient(theme.colors.primary50, false),
            data: data,
            label: {
              show: true,
              position: 'top',
              ...baseBarConfig.label,
            },
          },
          {
            name,
            type: 'bar',
            barWidth: 20,
            barGap: '-100%',
            z: 2,
            silent: true,
            data: data.map(() => max),
            itemStyle: {
              color: createLinearGradient(theme.colors.primary50),
              opacity: 0.2,
            },
            animation: false,
          },
          {
            name,
            type: 'pictorialBar',
            symbolSize: [20, 8],
            symbolOffset: [0, -4],
            symbolPosition: 'end',
            z: 3,
            silent: true,
            color: theme.colors.assist50,
            data: data.map(() => max),
          },
        ],
      },
      config
    ) as ECOption;
  }, [
    baseBarConfig.label,
    baseChartConfig.grid,
    baseChartConfig.legend,
    baseChartConfig.tooltip,
    baseChartConfig.xAxis,
    baseChartConfig.yAxis,
    data,
    max,
    name,
    theme.colors.assist50,
    theme.colors.assist700,
    theme.colors.primary50,
    unit,
    xAxisData,
    config,
  ]);

  return (
    <div style={modifiedStyle}>
      {img && <img src={img} style={{ position: 'absolute', bottom: '13%', left: '3.4%', ...imgStyle }} />}
      <ReactEcharts
        ref={echartsRef}
        echarts={echarts}
        option={option}
        style={{ width: modifiedStyle.width, height: modifiedStyle.height }}
      />
    </div>
  );
};
