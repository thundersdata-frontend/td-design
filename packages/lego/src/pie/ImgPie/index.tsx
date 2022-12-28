import * as echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { GraphicComponent, GraphicComponentOption, TooltipComponent, TooltipComponentOption } from 'echarts/components';
import { merge } from 'lodash-es';
import React, { CSSProperties, forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import imgPieBg from '../../assets/img_pie_bg.webp';
import imgPieGraphic from '../../assets/img_pie_graphic.png';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import useBasePieConfig from '../../hooks/useBasePieConfig';
import useEchartsRef from '../../hooks/useEchartsRef';
import useNodeBoundingRect from '../../hooks/useNodeBoundingRect';
import { useRAF } from '../../hooks/useRAF';
import useStyle from '../../hooks/useStyle';
import useTheme from '../../hooks/useTheme';
import createLinearGradient from '../../utils/createLinearGradient';

type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GraphicComponentOption>;

echarts.use([TooltipComponent, PieChart, GraphicComponent]);

export interface ImgPieProps {
  data: { name: string; value: string | number }[];
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  autoLoop?: boolean;
  config?: ECOption;
  pieColors?: [string, string][];
  onEvents?: Record<string, (params?: any) => void>;
}

/** 带图片的饼图-对应Figma饼图3 */
export default forwardRef<ReactEcharts, ImgPieProps>(
  ({ data = [], style, imgStyle, autoLoop = false, config, pieColors = [], onEvents }, ref) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig();
    const basePieConfig = useBasePieConfig();
    const { style: modifiedStyle } = useStyle(style);
    const { raf } = useRAF();
    // 数据长度，轮播时使用
    const length = data.length;

    // 记录轮播的位置，图例不显示的时候使用
    const activeLegendsIndex = useRef(0);
    const { ref: echartsRef, getInstance } = useEchartsRef(ref);
    const timer = useRef<any>();

    // 图例选中的下标，图例不选中时不轮播
    const [activeLegends, setActiveLegends] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

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

    //定时器
    useEffect(() => {
      if (!autoLoop) {
        return;
      }
      requestAnimationFrame(() => {
        if (echartsRef?.current && activeLegends?.length > 1) {
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
    }, [activeLegends, autoLoop, activeLegends.length, raf, echartsRef]);

    //currentIndex 驱动数据变化
    useEffect(() => {
      const instance = getInstance();
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
    }, [currentIndex, length, echartsRef, data, getInstance]);

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
      seriesData.push(data[0]);
    } else {
      data.forEach(ele => {
        seriesData.push(
          {
            value: +ele.value,
            name: ele.name,
            percent: (+ele.value / total) * 100,
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
      });
    }

    const option = merge(
      {
        color: colors,
        legend: {
          ...baseChartConfig.legend,
          orient: 'horizontal',
          data: seriesData.filter(i => i.name),
        },
        graphic: {
          elements: [
            {
              type: 'image',
              left: 'center',
              style: {
                image: imgPieGraphic,
                width: rect?.height / 5,
                height: rect?.height / 5,
              },
              top: 'center',
            },
          ],
        },
        series: {
          ...basePieConfig,
          left: 0,
          radius: ['35%', '55%'],
          hoverAnimation: false,
          silent: autoLoop,
          data: seriesData,
          legendHoverLink: false,
          labelLine: {
            show: false,
          },
          label: {
            show: seriesData.length === 1,
            position: 'center',
            formatter: ({ name }: { name: string }) => {
              if (!name) return;
              return `{a|${name}}{b|\n${Number(seriesData.find(item => item.name === name)?.percent).toFixed(1)}%}`;
            },
            rich: {
              a: {
                ...theme.typography.p2,
                color: theme.colors.gray100,
              },
              b: {
                ...theme.typography.h4,
                color: theme.colors.gray50,
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
      },
      config
    );

    return (
      <div
        style={{
          width: '95%',
          height: '90%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...modifiedStyle,
        }}
        ref={divRef}
      >
        <img
          src={imgPieBg}
          style={{
            position: 'absolute',
            width: proportion > 1.25 ? 'auto' : '90%',
            height: proportion > 1.25 ? '90%' : 'auto',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            ...imgStyle,
          }}
        />
        <ReactEcharts
          ref={echartsRef}
          style={{ width: modifiedStyle.width, height: modifiedStyle.height }}
          echarts={echarts}
          option={option}
          onEvents={{
            legendselectchanged: legendselectchanged,
            ...onEvents,
          }}
        />
        ;
      </div>
    );
  }
);
