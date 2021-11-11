import React from 'react';
import { Map } from '@td-design/lego';

export default () => (
  <Map
    style={{ width: 486, height: 584 }}
    pointData={[
      {
        name: '浙江省',
        value: [119.956, 30.05, 2],
      },
      {
        name: '山东省',
        value: [116.41, 39.91, 3],
      },
      {
        name: '陕西省',
        value: [110, 36.72, 4],
      },
    ]}
    pointConfig={{
      symbolSize: 10,
      symbol:
        'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
    }}
    otherSeriesConfig={{
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: 'pin',
      legendHoverLink: true,
      symbolSize: [30, 30],
      label: {
        show: true,
        formatter(value) {
          return value.data.value[2];
        },
        color: '#fff',
      },
      itemStyle: {
        normal: {
          color: '#D8BC37', //标志颜色
          shadowBlur: 2,
          shadowColor: 'D8BC37',
        },
      },
      data: [
        {
          name: '台湾',
          value: [122, 23, 1],
        },
        {
          name: '天津',
          value: [117.4219, 39.4189, 3],
        },
        {
          name: '河北',
          value: [114.4995, 38.1006, 4],
        },
        {
          name: '山西',
          value: [112.3352, 37.9413, 5],
        },
        {
          name: '江苏',
          value: [118.8062, 31.9208, 11],
        },
        {
          name: '浙江',
          value: [119.5313, 29.8773, 12],
        },
        {
          name: '安徽',
          value: [117.29, 32.0581, 13],
        },
        {
          name: '海南',
          value: [110.3893, 19.8516, 32],
        },
      ],
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke',
      },
      hoverAnimation: true,
      zlevel: 1,
    }}
  />
);
