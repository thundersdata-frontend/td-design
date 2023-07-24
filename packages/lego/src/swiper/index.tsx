import React, { forwardRef, ReactNode, useImperativeHandle } from 'react';

import { Autoplay, Pagination } from 'swiper';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/swiper.min.css';

import './index.less';

export interface CustomSwiperProps {
  /** 需要轮播的图片 */
  imgs?: string[];
  /** img的样式，主要为宽度和高度 */
  style?: React.CSSProperties;
  /** 是否自动播放，delay为切换速度(ms) */
  autoplay?: {
    delay: number;
  };
  /** 每次轮播时展示几张图片 */
  imgNumPerSlide?: number;
  /** 解决除图片轮播之外的情况 */
  list?: ReactNode[];
  /** 分页器 */
  pagination?: any;
}

const CustomSwiper = forwardRef<any, CustomSwiperProps>(
  ({ imgs = [], style, imgNumPerSlide = 1, autoplay, list = [], pagination }, ref) => {
    const auto = autoplay?.delay ? { pauseOnMouseEnter: true, disableOnInteraction: false, ...autoplay } : false;

    const swiperInstance = useSwiper();

    useImperativeHandle(ref, () => {
      return {
        enable() {
          swiperInstance.enable();
        },
        disable() {
          swiperInstance.disable();
        },
        slideNext() {
          swiperInstance.slideNext();
        },
        slidePrev() {
          swiperInstance.slidePrev();
        },
        slideReset() {
          swiperInstance.slideReset();
        },
        slideTo(index: number, speed?: number) {
          swiperInstance.slideTo(index, speed);
        },
      };
    });

    return (
      <div className="td-lego-swiper-container">
        {imgs.length > 0 || list.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={imgNumPerSlide}
            slidesPerGroup={imgNumPerSlide}
            loop
            pagination={pagination === false ? false : { clickable: true, ...pagination }}
            autoplay={auto}
            initialSlide={0}
          >
            {imgs.length > 0
              ? imgs.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={item}
                      key={index}
                      style={{
                        width: 692,
                        height: 297,
                        paddingBottom: 40,
                        ...style,
                      }}
                    />
                  </SwiperSlide>
                ))
              : list.map((ele, index) => <SwiperSlide key={index}>{ele}</SwiperSlide>)}
          </Swiper>
        ) : null}
      </div>
    );
  }
);

export default CustomSwiper;
