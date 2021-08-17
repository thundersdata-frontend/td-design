import { CustomSeriesOption } from 'echarts/charts';
import { Theme } from '../theme';
import createLinearGradient from './createLinearGradient';

export default function createCuboidSeries(theme: Theme, seriesData: { name?: string; data: number[] }) {
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
              fill: theme.colors.assist100,
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
              fill: createLinearGradient(theme.colors.primary300),
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
              fill: createLinearGradient(theme.colors.primary300, false),
            },
          },
        ],
      };
    },
  } as CustomSeriesOption;
}
