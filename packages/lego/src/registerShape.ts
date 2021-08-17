import * as echartsOption from 'echarts/core';

declare const echarts: typeof echartsOption;

export function registerAllShape() {
  // cube
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - 9, shape.y - 9];
      const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9];
      const c3 = [xAxisPoint[0], xAxisPoint[1]];
      ctx.moveTo(c0[0], c0[1])!.lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
    },
  });
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y];
      const c2 = [xAxisPoint[0], xAxisPoint[1]];
      const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9];
      const c4 = [shape.x + 18, shape.y - 9];
      ctx.moveTo(c1[0], c1[1])!.lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
    },
  });
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + 18, shape.y - 9];
      const c3 = [shape.x + 9, shape.y - 18];
      const c4 = [shape.x - 9, shape.y - 9];
      ctx.moveTo(c1[0], c1[1])!.lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
    },
  });
  echarts.graphic.registerShape('CubeLeft', CubeLeft);
  echarts.graphic.registerShape('CubeRight', CubeRight);
  echarts.graphic.registerShape('CubeTop', CubeTop);

  // cylinder
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
}
