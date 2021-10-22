import React from 'react';
import { Map } from '@td-design/lego';

export default () => (
  <Map
    style={{ width: 486, height: 554 }}
    enableDrill
    returnBtnText="< 返回上级"
    onDrill={(currentTarget, mapInfoList) => {
      console.log('currentTarget: ', currentTarget);
      console.log('mapInfoList: ', mapInfoList);
    }}
  />
);
