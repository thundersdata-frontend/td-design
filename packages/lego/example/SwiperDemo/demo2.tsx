import React from 'react';
import { Swiper } from '@td-design/lego';

export default () => {
  const data = [
    '今天是个好日子好日子好日子好日子好日子哦',
    '明天是个好日子好日子好日子好日子好日子哦',
    '后天是个好日子好日子好日子好日子好日子哦',
  ];
  const list = data.map((str, index) => (
    <div key={index} style={{ textAlign: 'center', color: 'red' }}>
      {str}
    </div>
  ));

  return <Swiper autoplay={{ delay: 2000 }} list={list} />;
};
