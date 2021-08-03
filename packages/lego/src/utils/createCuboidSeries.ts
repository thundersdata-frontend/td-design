import * as echarts from 'echarts/core';
import { CustomSeriesOption } from 'echarts/charts';

export default function createCuboidSeries(seriesData: { name?: string; data: number[] }) {
  return {
    type: 'custom',
    name: seriesData.name,
    data: seriesData.data,
    yAxisIndex: 0,
    renderItem: (_, api) => {
      const location = api.coord([api.value(0), api.value(1)]);
      return {
        type: 'group',
        children: [
          {
            type: 'CubeLeft',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0]),
            },
            style: {
              fill: '#CC9F06',
            },
          },
          {
            type: 'CubeRight',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0]),
            },
            style: {
              fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#F2F756',
                },
                {
                  offset: 1,
                  color: '#FEB01E',
                },
              ]),
            },
          },
          {
            type: 'CubeTop',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0]),
            },
            style: {
              fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#FFBB17',
                },
                {
                  offset: 1,
                  color: '#F5E483',
                },
              ]),
            },
          },
        ],
      };
    },
  } as CustomSeriesOption;
}
