import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { TooltipComponent, TooltipComponentOption, GraphicComponent, GraphicComponentOption } from 'echarts/components';

import baseChartConfig from '../../baseChartConfig';
import theme from '../../theme';
import basePieConfig from '../../basePieConfig';
import createLinearGradient from '../../utils/createLinearGradient';

type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GraphicComponentOption>;

echarts.use([TooltipComponent, PieChart, GraphicComponent]);

/** 带图片的玫瑰图-对应Figma饼图5 */
export default ({
  seriesData,
  style,
  imgStyle,
}: {
  seriesData: { name: string; value: string; percent: number }[];
  style?: CSSProperties;
  imgStyle?: CSSProperties;
}) => {
  const option = useMemo(() => {
    return {
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
        selectedMode: false,
      },
      graphic: {
        elements: [
          {
            type: 'image',
            left: 'center',
            style: {
              image: require('../../assets/img_pie_graphic.png'),
              width: 99,
              height: 99,
            },
            top: 'center',
            zlevel: 2,
          },
          {
            type: 'image',
            left: 'center',
            style: {
              image: require('../../assets/img_rose_pie_graphic.png'),
              width: 50,
              height: 50,
            },
            top: 'center',
            zlevel: 3,
          },
        ],
      },
      series: {
        ...basePieConfig,
        left: 0,
        right: 0,
        radius: ['33%', '62%'],
        hoverAnimation: false,
        silent: true,
        data: seriesData,
        roseType: 'radius',
        zlevel: 3,
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
    } as ECOption;
  }, [seriesData]);

  return (
    <div style={{ position: 'relative' }}>
      <img
        src={require('../../assets/img_rose_pie_bg.webp')}
        style={{ position: 'absolute', top: 44, left: 60, ...imgStyle }}
      />
      <ReactEcharts style={style} echarts={echarts} option={option} />
    </div>
  );
};
