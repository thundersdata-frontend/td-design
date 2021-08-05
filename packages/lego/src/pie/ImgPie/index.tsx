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

/** 带图片的饼图-对应Figma饼图3 */
export default ({
  seriesData,
  style,
}: {
  seriesData: { name: string; value: string; percent: number }[];
  style?: CSSProperties;
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
        orient: 'vertical',
        selectedMode: false,
      },
      graphic: {
        elements: [
          {
            type: 'image',
            left: 'center',
            style: {
              image: require('../../assets/img_pie_graphic.png'),
              width: 93,
              height: 93,
            },
            top: 'center',
          },
          {
            type: 'image',
            left: 'center',
            style: {
              image: require('../../assets/img_pie_bg.png'),
              width: 407,
              height: 271,
            },
            top: 40,
          },
        ],
      },
      series: {
        ...basePieConfig,
        left: 0,
        radius: ['35%', '55%'],
        hoverAnimation: false,
        silent: true,
        data: seriesData,
        labelLine: {
          show: false,
        },
        label: {
          show: true,
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
      },
    } as ECOption;
  }, [seriesData]);

  return <ReactEcharts style={style} echarts={echarts} option={option} />;
};
