import React, { CSSProperties, forwardRef, useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';

import * as echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { GraphicComponent, GraphicComponentOption, TooltipComponent, TooltipComponentOption } from 'echarts/components';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { merge } from 'lodash-es';

import bg from '../assets/bg.png';
import imgPieGraphic from '../assets/img_pie_graphic.png';
import imgRosePieGraphic from '../assets/img_rose_pie_graphic.png';
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

const prefixName = 'td-lego-img-rose-pie';

type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GraphicComponentOption>;

echarts.use([TooltipComponent, PieChart, GraphicComponent, CanvasRenderer, SVGRenderer]);

export interface ImgRosePieProps {
  seriesData: {
    name: string;
    value: string | number;
    percent?: number | string;
  }[];
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  autoLoop?: boolean;
  config?: ECOption;
  /** 自动轮播的时长，默认为2s */
  duration?: number;
  pieColors?: [string, string][];
  /** 图表交互事件 */
  onEvents?: Record<string, (params?: any) => void>;
  /** 图表渲染器 */
  renderer?: 'canvas' | 'svg';
}

/** 带图片的玫瑰图-对应Figma饼图5 */
export default forwardRef<ReactEcharts, ImgRosePieProps>(
  (
    {
      seriesData,
      style,
      imgStyle,
      config,
      pieColors = [],
      duration = 2000,
      autoLoop = false,
      onEvents,
      renderer = 'canvas',
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig();
    const basePieConfig = useBasePieConfig();
    const { style: modifiedStyle } = useStyle(style);

    // 数据长度，轮播时使用
    const length = seriesData.length;

    // 图例选中的下标，图例不选中时不轮播
    const [activeLegends, setActiveLegends] = useState<number[]>([]);
    const echartsRef = useChartLoop(
      ref,
      seriesData.filter((_item, idx) => activeLegends.includes(idx)),
      autoLoop,
      duration
    );

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
      pieColors?.length > 0 && pieColors?.length >= seriesData?.length
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

    const option = merge(
      {
        color: colors,
        legend: {
          ...baseChartConfig.legend,
        },
        series: {
          ...basePieConfig,
          left: 0,
          right: 0,
          center: ['50%', '54%'],
          radius: ['33%', '62%'],
          hoverAnimation: false,
          silent: true,
          data: seriesData,
          roseType: 'radius',
          legendHoverLink: false,
          zlevel: 3,
          emphasis: {
            scale: true,
            scaleSize: 10,
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(255, 255, 255, 0.6)',
            },
          },
          label: {
            position: 'outside',
            padding: [10, -50, 50, -40],
            formatter: '{a|{b}}\n{a|{d}%}',
            rich: {
              a: {
                ...theme.typography.p2,
                color: theme.colors.gray50,
              },
            },
          },
          labelLine: {
            ...basePieConfig.labelLine,
            show: true,
            length2: 40,
            minTurnAngle: 45,
          },
        },
      },
      config
    );
    const imageStyle: React.CSSProperties = {
      position: 'absolute',
      top: '54%',
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
        {/* 旋转背景 图 */}
        <div style={imageStyle}>
          <img src={bg} className={`${prefixName}-bg`} />
        </div>
        <div style={imageStyle}>
          <img src={outerBg} className={`${prefixName}-outer-image`} />
        </div>
        <div style={imageStyle}>
          <img src={innerBg} className={`${prefixName}-inner-image`} />
        </div>
        {/* 大圆 */}
        <img
          src={imgPieGraphic}
          style={{
            position: 'absolute',
            top: '54%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            width: proportion > 1.67 ? 'auto' : '15%',
            height: proportion > 1.67 ? '25%' : 'auto',
            ...imgStyle,
          }}
        />
        {/* 小圆 */}
        <img
          src={imgRosePieGraphic}
          style={{
            position: 'absolute',
            top: '54%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            width: proportion > 1.67 ? 'auto' : '8%',
            height: proportion > 1.67 ? '16%' : 'auto',
            ...imgStyle,
          }}
        />
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
