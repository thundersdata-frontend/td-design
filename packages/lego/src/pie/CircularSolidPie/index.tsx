import React, { CSSProperties, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { TooltipComponent, TooltipComponentOption, GraphicComponent, GraphicComponentOption } from 'echarts/components';
import { merge } from 'lodash-es';

import createLinearGradient from '../../utils/createLinearGradient';
import useTheme from '../../hooks/useTheme';
import useBasePieConfig from '../../hooks/useBasePieConfig';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';

import imgPieBg from '../../assets/img_circle_bg.webp';
import useChartLoop from '../../hooks/useChartLoop';
import useStyle from '../../hooks/useStyle';
import useNodeBoundingRect from '../../hooks/useNodeBoundingRect';

type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GraphicComponentOption>;

echarts.use([TooltipComponent, PieChart, GraphicComponent]);

export interface CircularSolidPieProps {
  data: { name: string; value: string | number }[];
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  autoLoop?: boolean;
  config?: ECOption;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  pieColors?: [string, string][];
  onEvents?: Record<string, (params?: any) => void>;
}

/** 透明圆环饼图-对应Figma饼图4 */
export default forwardRef<ReactEcharts, CircularSolidPieProps>(
  ({ data = [], style, imgStyle, autoLoop = false, config, duration = 2000, pieColors = [], onEvents }, ref) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig();
    const basePieConfig = useBasePieConfig();
    // 图例选中的下标，图例不选中时不轮播
    const [activeLegends, setActiveLegends] = useState<number[]>([]);
    // 数据长度，轮播时使用
    const length = data.length;
    const echartsRef = useChartLoop(
      ref,
      data.filter((_item, idx) => activeLegends.includes(idx)),
      autoLoop,
      duration
    );

    const { style: modifiedStyle } = useStyle(style);

    const divRef = useRef<HTMLDivElement>(null);
    const rect = useNodeBoundingRect(divRef);

    // 初始化轮播的下标
    useEffect(() => {
      const arr = new Array(length).fill(0).map((_, i) => i);
      setActiveLegends(arr);
    }, [length]);

    // 记录图例改变后的数据
    const legendSelectChanged = useCallback(({ selected }: { selected: { [name: string]: boolean } }) => {
      const selectArr: number[] = [];
      Object.keys(selected).forEach((key, index) => {
        if (selected[key]) {
          selectArr.push(index);
        }
      });
      setActiveLegends(selectArr);
    }, []);

    const baseColors = useMemo(() => {
      if (pieColors?.length > 0 && pieColors?.length >= data?.length) {
        return pieColors;
      }
      return [
        theme.colors.primary50,
        theme.colors.primary100,
        theme.colors.primary200,
        theme.colors.primary300,
        theme.colors.primary400,
        theme.colors.primary500,
      ];
    }, [
      pieColors,
      data?.length,
      theme.colors.primary200,
      theme.colors.primary50,
      theme.colors.primary100,
      theme.colors.primary300,
      theme.colors.primary400,
      theme.colors.primary500,
    ]);

    const colors = useMemo(() => baseColors.map(item => createLinearGradient(item)), [baseColors]);

    const option = useMemo(() => {
      const total = Math.round(
        data
          .map(item => +item.value)
          .reduce((value: number, total: number) => {
            return value + total;
          }, 0)
      );

      const gapValue = Number(total) * 0.01;

      const seriesData: any[] = [];
      if (data.length == 1) {
        seriesData.push(data[0]);
      } else {
        data.forEach(ele => {
          seriesData.push(
            {
              value: +ele.value,
              name: ele.name,
              percent: ((+ele.value / total) * 100).toFixed(2),
            },
            {
              value: gapValue,
              name: '',
              itemStyle: {
                color: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
              },
            }
          );
        });
      }

      return merge(
        {
          color: colors,
          legend: {
            ...baseChartConfig.legend,
            orient: 'vertical',
            left: '1%',
          },
          series: [
            {
              ...basePieConfig,
              name: '数据环',
              left: 0,
              right: 0,
              center: ['50%', '60%'],
              radius: ['62%', '72%'],
              label: {
                show: false,
              },
              data: seriesData,
              zlevel: 3,
              emphasis: {
                scale: true,
                scaleSize: 10,
                itemStyle: {
                  shadowBlur: 20,
                  shadowColor: 'rgba(255, 255, 255, 0.6)',
                },
              },
            },
            {
              ...basePieConfig,
              name: '数据标签',
              type: 'pie',
              center: ['50%', '60%'],
              radius: ['62%', '72%'],
              itemStyle: {
                opacity: 0,
                borderWidth: 0,
              },
              label: {
                position: 'outside',
                padding: [10, -50, 50, -40],
                formatter: ({ name }: { name: string }) => {
                  if (!name) return;
                  return `{a|${name}}{b|\n${Number(seriesData.find(item => item.name === name)?.percent).toFixed(2)}%}`;
                },
                opacity: 1,
                rich: {
                  a: {
                    ...theme.typography.p2,
                    color: theme.colors.gray50,
                  },
                  b: {
                    ...theme.typography.p2,
                    color: theme.colors.gray50,
                  },
                },
              },
              labelLine: {
                ...basePieConfig.labelLine,
                show: true,
                length2: 60,
                minTurnAngle: 45,
              },
              data: seriesData.filter(item => !!item.name),
              zlevel: 3,
            },
            {
              name: '透明环',
              type: 'pie',
              center: ['50%', '60%'],
              radius: ['50%', '65%'],
              silent: true,
              itemStyle: {
                opacity: 0.3,
              },
              label: {
                show: false,
              },
              data: seriesData,
            },
          ],
        },
        config
      ) as ECOption;
    }, [baseChartConfig.legend, basePieConfig, data, theme.colors.gray50, colors, theme.typography.p2, config]);

    return (
      <div style={modifiedStyle} ref={divRef}>
        <img
          src={imgPieBg}
          style={{
            position: 'absolute',
            top: (rect?.height ?? 0) * 0.6 - 310 / 2,
            left: ((rect?.width ?? 0) - 401) / 2,
            ...imgStyle,
          }}
        />
        <ReactEcharts
          ref={echartsRef}
          style={{ width: modifiedStyle.width, height: modifiedStyle.height }}
          echarts={echarts}
          option={option}
          onEvents={{
            legendSelectChanged,
            ...onEvents,
          }}
        />
      </div>
    );
  }
);
