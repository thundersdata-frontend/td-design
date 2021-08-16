import * as echarts from 'echarts/core';
import { CustomSeriesOption } from 'echarts/charts';
import createLinearGradient from './createLinearGradient';
import { Theme } from '../theme';

const CylinderTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const { x, y, itemWidth } = shape;
    const c0 = [x + itemWidth / 2, y];

    const arc1 = [x, y + itemWidth / 2];
    const arc2 = [x, y - itemWidth / 2];

    ctx
      .moveTo(c0[0], c0[1])!
      .arc(arc1[0], arc1[1], (itemWidth / 2) * Math.sqrt(2), 1.25 * Math.PI, 1.75 * Math.PI, false)
      .arc(arc2[0], arc2[1], (itemWidth / 2) * Math.sqrt(2), 0.25 * Math.PI, 0.75 * Math.PI, false)
      .closePath();
  },
});

const CylinderBody = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const { x, y, xAxisPoint, itemWidth } = shape;

    const c0 = [x + itemWidth / 2, y];
    const c1 = [x - itemWidth / 2, y];
    const c2 = [xAxisPoint[0] - itemWidth / 2, xAxisPoint[1]];
    const c3 = [xAxisPoint[0] + itemWidth / 2, xAxisPoint[1]];

    const arc = [xAxisPoint[0], xAxisPoint[1] - itemWidth / 2];

    ctx
      .moveTo(c0[0], c0[1])!
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .arc(arc[0], arc[1], (itemWidth / 2) * Math.sqrt(2), 0.25 * Math.PI, 0.75 * Math.PI, false)
      .lineTo(c3[0], c3[1])
      .closePath();
  },
});
echarts.graphic.registerShape('cylinderTop', CylinderTop);
echarts.graphic.registerShape('cylinderBody', CylinderBody);

export default function createCylinderSeries(
  theme: Theme,
  seriesData: { name?: string; data: { name: string; value: number }[] }
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
          },
          {
            type: 'cylinderTop',
            shape,
            style: {
              fill: seriesIndex === 0 ? theme.colors.assist700 : theme.colors.assist800,
            },
          },
        ],
      };
    },
  } as CustomSeriesOption;
}