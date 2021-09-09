import React from 'react';
import { SliceBar } from '@td-design/lego';

export default () => (
  <SliceBar
    max={1000}
    unit="万元"
    xAxisData={['太原', '西安', '北京', '上海', '成都', '重庆', '南京', '广州', '厦门', '哈尔滨', '济南', '南昌']}
    name="产值"
    data={[
      {
        name: '太原',
        value: 960,
      },
      {
        name: '西安',
        value: 548.7,
      },
      {
        name: '北京',
        value: 300.2,
      },
      {
        name: '上海',
        value: 300,
      },
      {
        name: '成都',
        value: 300,
      },
      {
        name: '重庆',
        value: 300,
      },
      {
        name: '南京',
        value: 300,
      },
      {
        name: '广州',
        value: 300,
      },
      {
        name: '厦门',
        value: 300,
      },
      {
        name: '哈尔滨',
        value: 300,
      },
      {
        name: '济南',
        value: 300,
      },
      {
        name: '南昌',
        value: 300,
      },
    ]}
    style={{ width: 486, height: 254 }}
  />
);
