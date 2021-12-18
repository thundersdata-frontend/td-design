import { CustomSeriesOption } from 'echarts/charts';
import createLinearGradient from './createLinearGradient';
import { Theme } from '../theme';
import { CustomSeriesRenderItemReturn } from 'echarts/types/dist/shared';

export default function createCylinderSeries(
  theme: Theme,
  seriesData: { name?: string; data: (string | number | { name: string; value: string | number })[] }
) {
  return {
    type: 'custom',
    name: seriesData.name,
    data: seriesData.data,
    yAxisIndex: 0,
    renderItem: (params, api) => {
      const { seriesIndex = 0 } = params;
      const location = api.coord([api.value(0), api.value(1)]);
      const xAxisPoint = api.coord([api.value(0), 0]);

      const offsetX = seriesIndex === 0 ? -10 : 15;
      const shape = {
        x: location[0] + offsetX,
        y: location[1],
        itemWidth: 20,
        xAxisPoint: [xAxisPoint[0] + offsetX, xAxisPoint[1]],
      };

      return {
        type: 'group',
        children: [
          {
            type: 'cylinderBody',
            shape,
            style: {
              fill:
                seriesIndex === 0
                  ? createLinearGradient(theme.colors.primary50)
                  : createLinearGradient(theme.colors.primary300),
            },
            styleEmphasis: {
              shadowBlur: 20,
              shadowColor: 'rgba(255, 255, 255, 1)',
            },
          },
          {
            type: 'cylinderTop',
            shape,
            style: {
              fill: seriesIndex === 0 ? theme.colors.assist700 : theme.colors.assist800,
            },
            styleEmphasis: {
              shadowBlur: 20,
              shadowColor: 'rgba(255, 255, 255, 1)',
            },
          },
        ],
      } as any as CustomSeriesRenderItemReturn;
    },
  } as CustomSeriesOption;
}
