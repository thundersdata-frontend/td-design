import * as echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import {
  PieChart, // 系列类型的定义后缀都为 SeriesOption
  PieSeriesOption,
} from 'echarts/charts';
import {
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
  LegendComponent,
  TooltipComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { merge } from 'lodash-es';
import React, { CSSProperties, forwardRef, useCallback, useEffect, useMemo, useState } from 'react';

import useChartLoop from '../../hooks/useChartLoop';
import useTheme from '../../hooks/useTheme';
import createLinearGradient from '../../utils/createLinearGradient';
import chartBg from './assets/chart_bg.svg';
import legendBg from './assets/legend_bg.svg';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([GridComponent, PieChart, CanvasRenderer, LegendComponent]);

export type DataType = {
  value: string | number;
  name: string;
  percent?: number;
  itemStyle?: any;
};

export interface BasePieProps {
  data: DataType[];
  unit?: string;
  onlyPercentage?: boolean;
  style?: CSSProperties;
  autoLoop?: boolean;
  duration?: number;
  config?: ECOption;
  pieColors?: [string, string][];
  legendPosition?: 'right' | 'bottom';
  onEvents?: Record<string, (params?: any) => void>;
}

const BasePie = forwardRef<ReactEcharts, BasePieProps>(
  (
    {
      data,
      style,
      unit = '',
      autoLoop = false,
      onlyPercentage = false,
      duration = 2000,
      pieColors = [],
      config,
      onEvents,
      legendPosition = 'right',
    },
    ref
  ) => {
    const theme = useTheme();
    // 图例选中的下标，图例不选中时不轮播
    const [activeLegends, setActiveLegends] = useState<number[]>([]);
    const echartsRef = useChartLoop(
      ref,
      data.filter((_item, idx) => activeLegends.includes(idx)),
      autoLoop,
      duration
    );
    // 数据长度，轮播时使用
    const length = data.length;

    const [widthAndHeight, setWidthAndHeight] = useState<{
      width: number;
      height: number;
    }>();

    const containerRef = useCallback(node => {
      if (node !== null) {
        setWidthAndHeight({
          height: node.getBoundingClientRect().height,
          width: node.getBoundingClientRect().width,
        });
      }
    }, []);

    const baseColors =
      pieColors?.length > 0 && pieColors?.length >= data?.length
        ? pieColors
        : [
            theme.colors.primary50,
            theme.colors.primary100,
            theme.colors.primary200,
            theme.colors.primary300,
            theme.colors.primary400,
            theme.colors.primary500,
          ];

    const colors = baseColors.map(item => createLinearGradient(item));

    const { imageRadius, left, centerX } = useMemo(() => {
      if (!widthAndHeight) {
        return {
          imageRadius: 0,
          left: 0,
          centerX: '50%',
        };
      }

      const { width, height } = widthAndHeight;

      let circleWidth = 0;
      if (width >= height * 2) {
        circleWidth = height;
      } else {
        circleWidth = width / 2;
      }

      if (legendPosition === 'right') {
        return {
          imageRadius: circleWidth * 0.8,
          centerX: circleWidth / 2,
          left: circleWidth * 0.1,
        };
      }
      return {
        imageRadius: width * 0.8,
        left: width * 0.1,
        centerX: '50%',
      };
    }, [widthAndHeight, legendPosition]);

    const newData = useMemo(() => {
      const total = Math.round(
        data
          ?.map(item => +item.value)
          .reduce((value: number, total: number) => {
            return value + total;
          }, 0)
      );

      //增加百分比
      let formatData = data;
      if (data?.[0]?.percent) {
        formatData = data.map(item => {
          return {
            ...item,
            value: Math.round(+item.value),
            percent: (+item.value / total) * 100,
          };
        });
      }

      const gapValue = Number(total) * 0.01;

      const newData: DataType[] = [];
      if (formatData.length === 1) {
        newData.push({
          value: formatData[0].value,
          name: formatData[0].name,
          percent: (+formatData[0].value / total) * 100,
        });
      } else {
        for (let i = 0; i < formatData.length; i++) {
          newData.push(
            {
              value: formatData[i].value,
              name: formatData[i].name,
              percent: (+formatData[i].value / total) * 100,
              itemStyle: {
                borderRadius: 20,
              },
            },
            {
              value: gapValue,
              name: '',
              itemStyle: {
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0,
              },
            }
          );
        }
      }

      return newData;
    }, [data]);

    const { width = 0, height = 0 } = widthAndHeight || {};

    const isSmall = useMemo(() => {
      if (legendPosition === 'right') {
        if (width <= 400 || height <= 260) {
          return true;
        }
      } else {
        if (width <= 200 || height <= 300) {
          return true;
        }
      }
      return false;
    }, [width, height, widthAndHeight]);

    const lineHeight = isSmall ? 20 : 35;
    const itemGap = isSmall ? 3 : 7;
    const legend = Object.assign(
      {
        icon: 'circle',
        orient: 'vertical',
        data,
        show: true,
        itemGap,
        formatter: (name: string) => {
          return `{name|${name}} {percent|${newData
            ?.find((item: { name: string }) => item.name === name)
            ?.percent?.toFixed(2)}%}`;
        },
        textStyle: {
          width: 190,
          height: lineHeight,
          backgroundColor: {
            image: legendBg,
          },
          rich: {
            name: {
              color: theme.colors.gray50,
              padding: [8, 10],
              ...theme.typography.p2,
              lineHeight,
            },
            percent: {
              color: '#6FCCFF',
              align: 'right',
              padding: [0, 15, 0, 0],
              ...theme.typography[isSmall ? 'p1' : 'h4'],
              lineHeight,
            },
          },
        },
      },
      legendPosition === 'right'
        ? {
            right: 0,
            top: 'center',
          }
        : {
            left: 0,
            bottom: 0,
          }
    );

    // 计算最大显示图例的数量
    const legendLength = Math.floor((height - 20) / (lineHeight + itemGap));
    // 判断高度是否显示，如果数据大于图例最大显示数量隐藏图例
    const hideLegend = () => {
      if (legendPosition === 'right') {
        return length > legendLength;
      }
      return (height - imageRadius - 30) / (lineHeight + itemGap) < length;
    };

    const option = merge(
      {
        color: colors,
        legend: hideLegend() ? false : legend,
        // 底部的环状背景
        graphic: {
          elements: [
            {
              type: 'image',
              left: left,
              top: legendPosition === 'right' ? 'middle' : 20,
              x: 20,
              z: 0,
              style: {
                image: chartBg,
                width: imageRadius,
                height: imageRadius,
              },
            },
          ],
        },
        calculable: true,
        series: [
          {
            name: '',
            type: 'pie',
            radius: [imageRadius / 2 - 20, imageRadius / 2 - 5],
            center: [centerX, legendPosition === 'right' ? '50%' : imageRadius / 2 + 20],
            hoverAnimation: false,
            legendHoverLink: !autoLoop,
            silent: autoLoop,
            itemStyle: {
              borderRadius: 20,
            },
            data: newData,
            label: {
              show: newData.length === 1,
              position: 'center',
              formatter: ({ data }: { data: DataType }) => {
                if (!data.name) return;
                if (onlyPercentage) return `{a|${data.name}}{b|\n${data.percent?.toFixed(2)}}{c|%}`;
                return `{a|${data.name}}{b|\n${data.percent?.toFixed(2)}}{c|%}{d|\n${data.value}${unit}}`;
              },
              rich: {
                a: {
                  color: theme.colors.gray50,
                  align: 'center',
                  padding: 10,
                  ...theme.typography[isSmall ? 'p2' : 'p1'],
                },
                b: {
                  color: theme.colors.gray50,
                  align: 'center',
                  ...theme.typography[isSmall ? 'h3' : 'h2'],
                },
                c: {
                  color: theme.colors.gray50,
                  padding: [10, 0, 0, 5],
                  ...theme.typography.h4,
                },
                d: {
                  color: theme.colors.gray50,
                  padding: 8,
                  ...theme.typography.p1,
                },
              },
            },
            emphasis: {
              scale: true,
              scaleSize: 10,
              itemStyle: {
                shadowBlur: 20,
                shadowColor: 'rgba(255, 255, 255, 0.6)',
              },
              label: {
                show: true,
              },
            },
          },
        ],
      },
      config
    );

    // 初始化轮播的下标
    useEffect(() => {
      const arr = new Array(length).fill(0).map((_, i) => i);
      setActiveLegends(arr);
    }, [length]);

    // 记录图例的显示下标
    const handleLegendSelectChanged = useCallback(({ selected }: { selected: { [name: string]: boolean } }) => {
      const selectArr: number[] = [];
      Object.keys(selected).forEach((key, index) => {
        if (selected[key]) {
          selectArr.push(index);
        }
      });
      setActiveLegends(selectArr);
    }, []);

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          width: '95%',
          height: '90%',
          ...style,
        }}
        ref={containerRef}
      >
        <ReactEcharts
          echarts={echarts}
          ref={echartsRef}
          option={option}
          style={{ width: style?.width ?? '95%', height: style?.height ?? '90%' }}
          onEvents={{
            legendselectchanged: handleLegendSelectChanged,
            ...onEvents,
          }}
        />
      </div>
    );
  }
);

export default BasePie;
