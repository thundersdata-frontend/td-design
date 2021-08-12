import React, { useEffect, useRef } from 'react';
import { Swiper } from '@td-design/lego';

export default () => {
  const swiperRef = useRef<any>();
  useEffect(() => {
    setInterval(() => {
      swiperRef?.current?.swiper?.slideNext();
    }, 1000);
  }, []);

  return (
    <Swiper
      ref={swiperRef}
      imgs={[
        'https://fast-fregiht.oss-cn-hangzhou.aliyuncs.com/screen/shanxiluqiao_photo1.jpg',
        'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/industry/1626231634429684221.jpg',
        'https://uploadfile.bizhizu.cn/up/40/bc/53/40bc5393651da4083978f06f9ffac600.jpg.220.146.jpg',
        'https://uploadfile.bizhizu.cn/up/f8/de/73/f8de73289ff7286896f8200e8dc45867.jpg.220.146.jpg',
        'https://uploadfile.bizhizu.cn/up/0f/d2/26/0fd2267541f18505917a38c563498c6f.jpg.220.146.jpg',
      ]}
    />
  );
};
