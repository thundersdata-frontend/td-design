import { CustomSeriesOption } from 'echarts/charts';
import { CustomSeriesRenderItemReturn } from 'echarts/types/dist/shared';

import { registerCylinderShape } from '../registerShape';
import { Theme } from '../theme';
import createLinearGradient from './createLinearGradient';

export default function createCylinderSeries(theme: Theme, seriesData: BarSeriesData, yAxisIndex: number) {
  registerCylinderShape();

  return {
    type: 'custom',
    name: seriesData.name,
    data: seriesData.data.map(item => {
      if (typeof item === 'object') {
        return { ...item, unit: seriesData.unit };
      }
      return { value: item, unit: seriesData.unit };
    }),
    yAxisIndex,
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
            type: 'CylinderBody',
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
            type: 'CylinderTop',
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
