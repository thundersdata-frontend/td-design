import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ECharts } from 'echarts';
import * as echarts from 'echarts/core';
import {
  LineChart,
  LineSeriesOption,
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
import { YAXisOption } from 'echarts/types/dist/shared';
import { merge } from 'lodash-es';

import createCuboidSeries from '../../utils/createCuboidSeries';
import createLinearGradient from '../../utils/createLinearGradient';
import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useBaseLineConfig from '../../hooks/useBaseLineConfig';
import { useRAF } from '../../hooks/useRAF';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  LineSeriesOption | CustomSeriesOption | TooltipComponentOption | GridComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, LineChart, CustomChart, CanvasRenderer]);

/**
 * 长方体柱状图，对应figma柱状图4
 */
export default ({
  xAxisData,
  yAxis = [],
  barData,
  lineData,
  style,
  autoLoop,
  duration = 2000,
  config,
}: {
  xAxisData: SingleAxisComponentOption['data'];
  yAxis: Pick<SingleAxisComponentOption, 'name' | 'type'>[];
  lineData: { name: string; data: number[] };
  barData: { name: string; data: number[] };
  style?: CSSProperties;
  /** 控制是否自动轮播 */
  autoLoop?: boolean;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  config?: ECOption;
}) => {
  const theme = useTheme();
  const baseChartConfig = useBaseChartConfig();
  const baseLineConfig = useBaseLineConfig();

  // 用来控制当前轮播到哪个
  const [currentIndex, setCurrentIndex] = useState(-1);
  // 图表实例，轮播的本质是用 currentIndex 来驱动图表实例去 dispatchAction
  const echartsRef = useRef<ReactEcharts>(null);
  const instance = echartsRef.current?.getEchartsInstance() as ECharts;

  const { raf } = useRAF();
  const timer = useRef<symbol>();

  const length = xAxisData?.length ?? 0;

  useEffect(() => {
    // 开启自动轮播，同时echarts有示例，同时有数据的情况下，才开始
    if (autoLoop && echartsRef.current && length > 1) {
      timer.current = raf.setInterval(() => {
        setCurrentIndex(index => (index === length - 1 ? 0 : index + 1));
      }, duration);
    } else {
      setCurrentIndex(-1);
      timer.current && raf.clearInterval(timer.current);
    }
  }, [autoLoop, duration, raf, length]);

  // 用 currentIndex 来驱动图表变化
  useEffect(() => {
    // 取消高亮效果
    instance?.dispatchAction({
      type: 'downplay',
    });
    // 先把提示框都隐藏
    instance?.dispatchAction({
      type: 'hideTip',
    });

    if (currentIndex > -1) {
      // 再根据 currentIndex 显示对应的提示框
      instance?.dispatchAction({
        type: 'showTip',
        seriesIndex: 1,
        dataIndex: currentIndex,
      });
    }
  }, [currentIndex, instance, raf]);

  const option = useMemo(() => {
    return merge(
      {
        color: [createLinearGradient(theme.colors.primary200), createLinearGradient(theme.colors.primary300)],
        legend: {
          ...baseChartConfig.legend,
        },
        grid: {
          ...baseChartConfig.grid,
        },
        tooltip: {
          ...baseChartConfig.tooltip,
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          ...baseChartConfig.xAxis,
        },
        yAxis: [
          // 第一个是柱图
          {
            ...yAxis[0],
            ...baseChartConfig.yAxis,
            nameTextStyle: {
              ...(baseChartConfig.yAxis as YAXisOption).nameTextStyle,
              padding: [0, 40, 0, 0],
            },
          },
          // 第二个是线图
          {
            ...yAxis[1],
            ...baseChartConfig.yAxis,
            nameTextStyle: {
              ...(baseChartConfig.yAxis as YAXisOption).nameTextStyle,
              padding: [0, 0, 0, 30],
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: lineData.name,
            data: lineData.data,
            ...baseLineConfig,
            yAxisIndex: 1,
          },
          createCuboidSeries(theme, barData),
        ],
      },
      config
    ) as ECOption;
  }, [
    barData,
    baseChartConfig.grid,
    baseChartConfig.legend,
    baseChartConfig.tooltip,
    baseChartConfig.xAxis,
    baseChartConfig.yAxis,
    baseLineConfig,
    lineData.data,
    lineData.name,
    theme,
    xAxisData,
    yAxis,
    config,
  ]);

  return <ReactEcharts ref={echartsRef} echarts={echarts} option={option} style={style} />;
};
