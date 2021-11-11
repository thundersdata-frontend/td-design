import React from 'react';
import { Map } from '@td-design/lego';

export default () => (
  <Map
    style={{ width: 486, height: 584 }}
    lineData={[
      {
        coords: [
          [119.956, 30.05],
          [116.41, 39.91],
        ],
      },
      {
        coords: [
          [119.956, 30.05],
          [110, 36.72],
        ],
      },
    ]}
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
    linesConfig={{
      lineStyle: {
        color: 'yellow',
      },
    }}
    // 以下代码可以让 tooltip 显示
    config={{
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          if (!params.name || !isFinite(params.value?.[2])) {
            return;
          }
          return params.name + ' : ' + params.value[2];
        },
      },
    }}
  />
);
