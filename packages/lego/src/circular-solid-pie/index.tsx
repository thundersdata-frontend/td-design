import React, { CSSProperties, forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import * as echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { GraphicComponent, GraphicComponentOption, TooltipComponent, TooltipComponentOption } from 'echarts/components';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { merge } from 'lodash-es';

import bg from '../assets/bg.png';
import innerBg from '../assets/inner.png';
import outerBg from '../assets/outer.png';
import useBaseChartConfig from '../hooks/useBaseChartConfig';
import useBasePieConfig from '../hooks/useBasePieConfig';
import useChartLoop from '../hooks/useChartLoop';
import useNodeBoundingRect from '../hooks/useNodeBoundingRect';
import useStyle from '../hooks/useStyle';
import useTheme from '../hooks/useTheme';
import createLinearGradient from '../utils/createLinearGradient';
import './index.less';

const prefixName = 'td-lego-circular-solid-pie';

type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GraphicComponentOption>;

echarts.use([TooltipComponent, PieChart, GraphicComponent, CanvasRenderer, SVGRenderer]);

export interface CircularSolidPieProps {
  data: { name: string; value: string | number }[];
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  autoLoop?: boolean;
  config?: ECOption;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  inModal?: boolean;
  pieColors?: [string, string][];
  /** 图表交互事件 */
  onEvents?: Record<string, (params?: any) => void>;
  /** 图表渲染器 */
  renderer?: 'canvas' | 'svg';
}

/** 透明圆环饼图-对应Figma饼图4 */
export default forwardRef<ReactEcharts, CircularSolidPieProps>(
  (
    {
      data = [],
      style,
      imgStyle,
      autoLoop = false,
      config,
      duration = 2000,
      inModal = false,
      pieColors = [],
      onEvents,
      renderer = 'canvas',
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal);
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
    const { width = 0, height = 0 } = rect;

    // 容器宽高比例
    const proportion = height > 0 ? width / height : 0;

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
      seriesData.push({
        ...data[0],
        percent: 100,
      });
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
            // echarts中name为''或者是'\n'代笔legend换行
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

    const option = merge(
      {
        color: colors,
        legend: {
          ...baseChartConfig.legend,
          orient: 'horizontal',
          left: '1%',
          data: seriesData.filter(i => i.name),
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
              padding: inModal ? [0, -70, 50, -50] : [10, -50, 50, -40],
              formatter: ({ name }: { name: string }) => {
                if (!name) return;
                return `{a|${name}}{b|\n${Number(seriesData.find(item => item.name === name)?.percent).toFixed(2)}%}`;
              },
              opacity: 1,
              rich: {
                a: {
                  ...theme.typography[inModal ? 'p0' : 'p2'],
                  color: theme.colors.gray50,
                },
                b: {
                  ...theme.typography[inModal ? 'p0' : 'p2'],
                  color: theme.colors.gray50,
                },
              },
            },
            labelLine: {
              ...basePieConfig.labelLine,
              show: true,
              length2: inModal ? 85 : 60,
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
    );

    const imageStyle: React.CSSProperties = {
      position: 'absolute',
      top: '60%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: proportion > 1.67 ? 'auto' : '100%',
      height: proportion > 1.67 ? '100%' : 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...imgStyle,
    };

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          width: '95%',
          height: '90%',
          ...modifiedStyle,
        }}
        ref={divRef}
      >
        <div style={imageStyle}>
          <img src={bg} className={`${prefixName}-bg`} />
        </div>
        <div style={imageStyle}>
          <img src={outerBg} className={`${prefixName}-outer-image`} />
        </div>
        <div style={imageStyle}>
          <img src={innerBg} className={`${prefixName}-inner-image`} />
        </div>

        <ReactEcharts
          ref={echartsRef}
          style={{ width: modifiedStyle.width ?? '95%', height: modifiedStyle.height ?? '90%' }}
          echarts={echarts}
          option={option}
          onEvents={{
            legendSelectChanged,
            ...onEvents,
          }}
          opts={{ renderer }}
        />
      </div>
    );
  }
);
