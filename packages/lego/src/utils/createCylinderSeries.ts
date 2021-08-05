import * as echarts from 'echarts/core';
import { CustomSeriesOption } from 'echarts/charts';

const CylinderTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const { x, y, itemWidth } = shape;
    const c0 = [x + itemWidth / 2, y];
    const c1 = [x - itemWidth / 2, y];

    const arc1 = [x, y - itemWidth / 2];
    const arc2 = [x, y + itemWidth / 2];

    ctx
      .moveTo(c0[0], c0[1])!
      .arcTo(arc1[0], arc1[1], c1[0], c1[1], (itemWidth / 2) * Math.sqrt(2))
      .arcTo(arc2[0], arc2[1], c0[0], c0[1], (itemWidth / 2) * Math.sqrt(2))
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

    const arc = [xAxisPoint[0], xAxisPoint[1] + itemWidth / 2];

    ctx
      .moveTo(c0[0], c0[1])!
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .arcTo(arc[0], arc[1], c3[0], c3[1], (itemWidth / 2) * Math.sqrt(2))
      // .lineTo(c3[0], c3[1])
      .closePath();
  },
});
echarts.graphic.registerShape('cylinderTop', CylinderTop);
echarts.graphic.registerShape('cylinderBody', CylinderBody);

export default function createCylinderSeries(seriesData: { name?: string; data: number[] }) {
  return {
    type: 'custom',
    name: seriesData.name,
    data: seriesData.data,
    yAxisIndex: 0,
    renderItem: (_, api) => {
      const location = api.coord([api.value(0), api.value(1)]);
      const xAxisPoint = api.coord([api.value(0), 0]);

      return {
        type: 'group',
        children: [
          {
            type: 'cylinderBody',
            shape: {
              x: location[0],
              y: location[1],
              itemWidth: 20,
              xAxisPoint,
            },
            style: {
              fill: 'red',
            },
          },
          {
            type: 'cylinderTop',
            shape: {
              x: location[0],
              y: location[1],
              itemWidth: 20,
              xAxisPoint,
            },
            style: {
              fill: 'red',
            },
          },
        ],
      };
    },
  } as CustomSeriesOption;
}
