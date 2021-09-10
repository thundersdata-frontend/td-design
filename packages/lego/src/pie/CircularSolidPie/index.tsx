import React, { CSSProperties, useMemo, useRef, useState, useEffect, useCallback } from 'react';
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
import { useRAF } from '../../hooks/useRAF';

type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GraphicComponentOption>;

echarts.use([TooltipComponent, PieChart, GraphicComponent]);

/** 透明圆环饼图-对应Figma饼图4 */
export default ({
  data = [],
  style,
  imgStyle,
  autoLoop = true,
  config,
}: {
  data: { name: string; value: string }[];
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  autoLoop?: boolean;
  config?: ECOption;
}) => {
  const theme = useTheme();
  const baseChartConfig = useBaseChartConfig();
  const basePieConfig = useBasePieConfig();
  const { raf } = useRAF();
  // 数据长度，轮播时使用
  const length = data.length;

  // 记录轮播的位置，图例不显示的时候使用
  const activeLegendsIndex = useRef(0);
  const echartsRef = useRef<ReactEcharts>(null);
  const timer = useRef<any>();

  // 图例选中的下标，图例不选中时不轮播
  const [activeLegends, setActiveLegends] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // 初始化轮播的下标
  useEffect(() => {
    const arr = new Array(length).fill(0).map((_, i) => i);
    setActiveLegends(arr);
  }, [length]);

  //定时器
  useEffect(() => {
    if (!autoLoop) {
      return;
    }
    requestAnimationFrame(() => {
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
    };
  }, [activeLegends, autoLoop, length, raf]);

  // currentIndex 驱动数据变化
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
  const legendSelectChanged = useCallback(({ selected }: { selected: { [name: string]: boolean } }) => {
    const selectArr: number[] = [];
    Object.keys(selected).forEach((key, index) => {
      if (selected[key]) {
        selectArr.push(index);
      }
    });
    setActiveLegends(selectArr);
  }, []);

  const option = useMemo(() => {
    const total = Math.round(
      data
        .map((item: { value: string; name: string }) => +item.value)
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
        color: [
          createLinearGradient(theme.colors.primary50),
          createLinearGradient(theme.colors.primary100),
          createLinearGradient(theme.colors.primary200),
          createLinearGradient(theme.colors.primary300),
          createLinearGradient(theme.colors.primary400),
          createLinearGradient(theme.colors.primary500),
        ],
        legend: {
          ...baseChartConfig.legend,
          orient: 'vertical',
        },
        series: [
          {
            ...basePieConfig,
            name: '数据环',
            type: 'pie',
            center: ['50%', '50%'],
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
            center: ['50%', '50%'],
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
            center: ['50%', '50%'],
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
  }, [
    baseChartConfig.legend,
    basePieConfig,
    data,
    theme.colors.gray50,
    theme.colors.primary100,
    theme.colors.primary200,
    theme.colors.primary300,
    theme.colors.primary400,
    theme.colors.primary50,
    theme.colors.primary500,
    theme.typography.p2,
    config,
  ]);

  return (
    <div style={{ position: 'relative' }}>
      <img src={imgPieBg} style={{ position: 'absolute', top: -7, left: 45, ...imgStyle }} />
      <ReactEcharts
        ref={echartsRef}
        style={style}
        echarts={echarts}
        option={option}
        onEvents={{
          legendSelectChanged: legendSelectChanged,
        }}
      />
      ;
    </div>
  );
};
