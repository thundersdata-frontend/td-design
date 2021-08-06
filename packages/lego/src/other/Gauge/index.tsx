import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  LineSeriesOption,
  // 系列类型的定义后缀都为 SeriesOption
  CustomSeriesOption,
  GaugeChart,
  BarChart,
} from 'echarts/charts';
import {
  TooltipComponent,
  TooltipComponentOption,
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import baseChartConfig from '../../baseChartConfig';
import theme from '../../theme';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  LineSeriesOption | CustomSeriesOption | TooltipComponentOption | GridComponentOption
>;

// 注册必须的组件
echarts.use([TooltipComponent, BarChart, GridComponent, GaugeChart, CanvasRenderer]);

/**
 * 长方体柱状图，对应figma柱状图4
 */
export default ({
  style,
  imgStyle,
  min,
  max,
  value,
}: {
  min: number;
  max: number;
  value: number;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
}) => {
  const option = useMemo(() => {
    return {
      grid: {
        ...baseChartConfig.grid,
      },
      series: [
        {
          type: 'gauge',
          startAngle: 210,
          endAngle: -30,
          min: min,
          max: max,
          radius: '65%',
          splitNumber: 5,
          axisLine: {
            show: false,
            lineStyle: {
              color: [
                [0, theme.colors.primary400[0]],
                [0.2, theme.colors.primary400[0]],
                [0.4, theme.colors.primary300[0]],
                [0.6, theme.colors.primary200[0]],
                [0.8, theme.colors.primary50[0]],
                [1, theme.colors.primary100[0]],
              ],
            },
          },
          pointer: {
            show: true,
            length: '120%',
            radius: '50%',
            width: 2, //指针粗细
            itemStyle: {
              color: theme.colors.primary50[1],
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            color: 'auto',
            distance: -48,
            ...theme.typography.p0,
          },
          detail: {
            color: theme.colors.gray50,
            ...theme.typography.h1,
          },
          data: [
            {
              value: value,
            },
          ],
        },
        {
          name: '小圆形',
          type: 'pie',
          hoverAnimation: false,
          legendHoverLink: false,
          zlevel: 0,
          radius: ['0%', '2%'],
          tooltip: {
            show: false,
          },
          z: 10,
          label: {
            normal: {
              show: false,
              position: 'center',
            },
            emphasis: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              value: 100,
              name: '2',
              itemStyle: {
                normal: {
                  color: theme.colors.primary50[1],
                },
              },
            },
          ],
        },
        {
          name: '环',
          type: 'pie',
          hoverAnimation: false,
          legendHoverLink: false,
          zlevel: 0,
          radius: ['3%', '4%'],
          tooltip: {
            show: false,
          },
          z: 10,
          label: {
            normal: {
              show: false,
              position: 'center',
            },
            emphasis: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              value: 100,
              name: '2',
              itemStyle: {
                normal: {
                  color: theme.colors.primary50[1],
                },
              },
            },
          ],
        },
      ],
    } as ECOption;
  }, [max, min, value]);

  return (
    <div style={{ position: 'relative' }}>
      <img
        src={require('./assets/bg.png')}
        style={{
          position: 'absolute',
          ...imgStyle,
        }}
      />
      <ReactEcharts style={style} echarts={echarts} option={option} />;
    </div>
  );
};
