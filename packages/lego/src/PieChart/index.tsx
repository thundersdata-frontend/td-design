import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  PieChart,
  // 系列类型的定义后缀都为 SeriesOption
  PieSeriesOption,
} from 'echarts/charts';
import {
  TooltipComponent,
  TooltipComponentOption,
  // 组件类型的定义后缀都为 ComponentOption
  GridComponent,
  GridComponentOption,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { LabelFormatterCallback } from 'echarts';
import { CallbackDataParams } from 'echarts/types/dist/shared';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GridComponentOption>;

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, PieChart, CanvasRenderer]);

export default ({
  data,
  labelFormatter,
}: {
  data: number[];
  labelFormatter?: string | LabelFormatterCallback<CallbackDataParams>;
}) => {
  const option = useMemo(() => {
    return {
      series: [
        {
          type: 'pie',
          data,
          clockwise: false,
          startAngle: 45,
          radius: 70,
          center: ['52%', '45%'],
          label: {
            color: '#ff0000',
            formatter: labelFormatter,
          },
        },
      ],
    } as ECOption;
  }, [data, labelFormatter]);

  return <ReactEcharts echarts={echarts} option={option} />;
};
