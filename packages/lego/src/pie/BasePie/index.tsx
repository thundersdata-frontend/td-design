import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  PieChart,
  // 系列类型的定义后缀都为 SeriesOption
  PieSeriesOption,
} from 'echarts/charts';
import {
  TooltipComponentOption,
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { isEmpty, merge } from 'lodash-es';

import createLinearGradient from '../../utils/createLinearGradient';
import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import { useRAF } from '../../hooks/useRAF';
import leftBg from './assets/left_bg.svg';
import rightBg from './assets/right_bg.svg';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([GridComponent, PieChart, CanvasRenderer, LegendComponent]);

interface PropsType {
  data: { value: string | number; name: string; percent?: number }[];
  unit?: string;
  style?: CSSProperties;
  autoLoop?: boolean;
  config?: ECOption;
}

const BasePie = ({ data, style = { width: 486, height: 254 }, unit = '', autoLoop = false, config }: PropsType) => {
  const theme = useTheme();
  const echartsRef = useRef<ReactEcharts>(null);
  const baseChartConfig = useBaseChartConfig();
  const { raf } = useRAF();
  const domRef = useRef<HTMLDivElement>(null);

  // 图例选中的下标，图例不选中时不轮播
  const [activeLegends, setActiveLegends] = useState<number[]>([]);

  // 记录轮播的位置，图例不显示的时候使用
  const activeLegendsIndex = useRef(0);

  // 数据长度，轮播时使用
  const length = data.length;

  const timer = useRef<any>();
  const animationFrameId = useRef<number>();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [widthAndHeight, setWidthAndHeight] = useState<{ width: number; height: number }>();

  const containerRef = useCallback(node => {
    if (node !== null) {
      setWidthAndHeight({ height: node.getBoundingClientRect().height, width: node.getBoundingClientRect().width });
    }
  }, []);

  const option = useMemo(() => {
    if (!widthAndHeight) {
      return {};
    }
    const { width, height } = widthAndHeight;

    // 计算饼图
    const imageRadius = Math.min(width / 2 - 0.01 * width, height) * 0.84;
    // 根据半径计算图片的偏移量
    const right = width / 2 + (width / 2 - imageRadius) / 2;
    const total = Math.round(
      data
        ?.map((item: { value: string | number; name: string }) => +item.value)
        .reduce((value: number, total: number) => {
          return value + total;
        }, 0)
    );

    //增加百分比
    let formatData = data;
    if (data?.[0]?.percent) {
      formatData = data.map((item: { value: string | number; name: string }) => {
        return {
          ...item,
          value: Math.round(+item.value),
          percent: (+item.value / total) * 100,
        };
      });
    }

    const gapValue = Number(total) * 0.01;

    const newData: any[] = [];
    if (formatData.length == 1) {
      newData.push(formatData[0]);
    } else {
      for (let i = 0; i < formatData.length; i++) {
        newData.push(
          {
            value: formatData[i].value,
            name: formatData[i].name,
            percent: ((+formatData[i].value / total) * 100).toFixed(0),
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

    return merge(
      {
        color: [
          createLinearGradient(theme.colors.primary50),
          createLinearGradient(theme.colors.primary100),
          createLinearGradient(theme.colors.primary200),
          createLinearGradient(theme.colors.primary300),
          createLinearGradient(theme.colors.primary400),
          createLinearGradient(theme.colors.primary500),
        ],
        grid: {
          ...baseChartConfig.grid,
        },
        legend: {
          icon: 'circle',
          data: data,
          left: '50%',
          top: 'center',
          itemGap: 7,
          formatter: (name: string) => {
            return `{name|${name}} {percent|${
              newData?.find((item: { name: string }) => item.name === name)?.percent
            }%}`;
          },
          textStyle: {
            width: 190,
            height: 35,
            backgroundColor: {
              image: rightBg,
            },
            rich: {
              name: {
                color: theme.colors.gray50,
                padding: [8, 10],
                ...theme.typography.p2,
                lineHeight: 35,
              },
              percent: {
                color: '#6FCCFF',
                align: 'right',
                padding: [0, 15, 0, 0],
                ...theme.typography.h4,
                lineHeight: 35,
              },
            },
          },
        },

        graphic: {
          elements: [
            {
              type: 'image',
              right: right,
              z: 0,
              style: {
                image: leftBg,
                width: imageRadius,
                height: imageRadius,
              },
              x: 20,
              top: 'center',
            },
          ],
        },
        calculable: true,
        series: [
          {
            name: '',
            type: 'pie',
            right: '50%',
            radius: ['70%', '80%'],
            center: ['50%', '50%'],
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
              formatter: ({ data }: { data: any }) => {
                if (!data.name) return;
                return `{a|${data.name}}{b|\n${data.percent}}{c|%}{d|\n${data.value}${unit}}`;
              },
              rich: {
                a: {
                  color: theme.colors.gray100,
                  align: 'center',
                  padding: 10,
                  ...theme.typography.p3,
                },
                b: {
                  color: theme.colors.gray50,
                  align: 'center',
                  ...theme.typography.h1,
                },
                c: {
                  color: theme.colors.gray100,
                  padding: [10, 0, 0, 0],
                  ...theme.typography.h4,
                },
                d: {
                  color: theme.colors.gray50,
                  padding: 8,
                  ...theme.typography.p2,
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
    ) as ECOption;
  }, [
    widthAndHeight,
    data,
    theme.colors.primary50,
    theme.colors.primary100,
    theme.colors.primary200,
    theme.colors.primary300,
    theme.colors.primary400,
    theme.colors.primary500,
    theme.colors.gray50,
    theme.colors.gray100,
    theme.typography.p2,
    theme.typography.h4,
    theme.typography.p3,
    theme.typography.h1,
    baseChartConfig.grid,
    autoLoop,
    config,
    unit,
  ]);

  // 初始化轮播的下标
  useEffect(() => {
    const arr = new Array(length).fill(0).map((_, i) => i);
    setActiveLegends(arr);
  }, [length]);

  //定时器
  useEffect(() => {
    if (!autoLoop) {
      setCurrentIndex(-1);
      activeLegendsIndex.current = 0;
      return;
    }
    animationFrameId.current = requestAnimationFrame(() => {
      if (echartsRef?.current && length > 1) {
        timer.current = raf.setInterval(() => {
          setCurrentIndex(activeLegends[activeLegendsIndex.current]);
          if (activeLegendsIndex.current < activeLegends.length - 1) {
            activeLegendsIndex.current++;
          } else {
            activeLegendsIndex.current = 0;
          }
        }, 2000);
      }
    });
    return () => {
      raf.clearInterval(timer.current);
      animationFrameId.current && window.cancelAnimationFrame(animationFrameId.current);
    };
  }, [activeLegends, autoLoop, length, raf]);

  //currentIndex 驱动数据变化
  useEffect(() => {
    const instance = echartsRef.current?.getEchartsInstance() as any;

    if (currentIndex === length) {
      setCurrentIndex(0);
    }
    const currentName = data[currentIndex]?.name;
    instance?.dispatchAction({
      type: 'downplay',
    });

    currentName &&
      instance?.dispatchAction({
        type: 'highlight',
        name: currentName,
      });
  }, [currentIndex, length, echartsRef, data]);

  // 记录图例的显示下标
  const legendselectchanged = useCallback(({ selected }: { selected: { [name: string]: boolean } }) => {
    const selectArr: number[] = [];
    Object.keys(selected).forEach((key, index) => {
      if (selected[key]) {
        selectArr.push(index);
      }
    });
    setActiveLegends(selectArr);
  }, []);

  return (
    <div style={style} ref={containerRef}>
      <ReactEcharts
        echarts={echarts}
        ref={echartsRef}
        option={option}
        style={{ width: style.width, height: style.height }}
        onEvents={{
          legendselectchanged: legendselectchanged,
        }}
      />
    </div>
  );
};

export default BasePie;
