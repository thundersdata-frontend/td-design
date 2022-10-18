import { SimpleMap } from '@td-design/lego-map';

export default () => {
  const data = [
    [104.075045, 30.663774, 10],
    [104.689584, 31.476866, 10],
    [106.55408, 29.578697, 10],
    [108.94113, 34.352069, 10],
    [116.382836, 39.926047, 10],
    [103.799085, 36.114321, 10],
    [114.285544, 30.65433, 10],
    [106.669064, 26.696559, 10],
    [113.218501, 23.2084522, 10],
    [118.802027, 32.095359, 10],
    [121.423696, 31.320051, 10],
  ];

  return (
    <SimpleMap
      config={{
        tooltip: {},
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 2, //动画时间，值越小速度越快
              brushType: 'stroke', //波纹绘制方式 stroke, fill
              scale: 2, //波纹圆环最大限制，值越大波纹越大
            },
            symbol: 'circle',
            symbolSize: 20,
            itemStyle: {
              color: '#f00',
            },
            data,
          },
        ],
      }}
      style={{ width: '100%', height: 900 }}
    />
  );
};
