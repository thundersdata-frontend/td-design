import React from 'react';
import Map from '@td-design/lego-map';

export default () => (
  <Map
    style={{ width: 486, height: 584 }}
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
