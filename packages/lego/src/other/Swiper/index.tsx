import React, { forwardRef } from 'react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.less';
import 'swiper/components/pagination/pagination.less';
import styles from './index.module.less';

SwiperCore.use([Pagination, Autoplay]);

type CustomSwiperProps = {
  /** 需要轮播的图片 */
  imgs: string[];
  /** img的样式，主要为宽度和高度 */
  style?: React.CSSProperties;
  /** 是否自动播放，delay为切换速度(ms) */
  autoplay?: {
    delay: number;
  };
  /** 每次轮播时展示几张图片 */
  imgNumPerSlide?: number;
};

const CustomSwiper = forwardRef<any, CustomSwiperProps>(({ imgs = [], style, imgNumPerSlide = 1, autoplay }, ref) => {
  return (
    <div className={styles.container}>
      {imgs.length ? (
        <Swiper
          spaceBetween={0}
          slidesPerView={imgNumPerSlide}
          slidesPerGroup={imgNumPerSlide}
          loop
          pagination={{ clickable: true }}
          autoplay={autoplay}
          ref={ref}
          initialSlide={0}
        >
          {imgs.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item} key={index} style={{ width: 692, height: 297, ...style }} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
});

export default CustomSwiper;
