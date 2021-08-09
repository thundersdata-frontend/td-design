import React, { useCallback, useEffect, useRef, useState } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import Swiper, { SwiperRefNode } from 'react-id-swiper';
import 'swiper/components/pagination/pagination.less';
import styles from './index.module.less';
import { ReactNode } from 'react';
import { useRAF } from '../../hooks/useRAF';
import theme from '../../theme';

SwiperCore.use([Autoplay]);

type Column = {
  title: string;
  dataIndex: string;
  id?: number | string;
};

type CustomTableProps = {
  /** 列数据 */
  columns: Column[];
  /** 数据源 */
  data: ReactNode[];
  /** 速度（ms） */
  speed?: number;
};

const Table = ({ columns = [], data = [], speed = 3000 }: CustomTableProps) => {
  const swiper = useRef<SwiperRefNode>(null);
  const [index, setIndex] = useState(0);
  const params = {
    slidesPerView: 3,
    loop: true,
    height: 90,
  };

  const length = data.length;
  const { raf } = useRAF();

  const updateIndex = useCallback(() => {
    setIndex(idx => (idx < length - 1 ? idx + 1 : 0));
  }, [length]);

  useEffect(() => {
    swiper.current?.swiper?.update();
  }, [length]);

  useEffect(() => {
    swiper.current?.swiper?.slideTo(index);
  }, [index, length]);

  useEffect(() => {
    const interval = raf.setInterval(() => {
      updateIndex();
    }, speed);
    return () => raf.clearInterval(interval);
  }, [raf, speed, updateIndex]);

  useEffect(() => {
    if (swiper && swiper.current) {
      //鼠标覆盖停止自动切换
      swiper.current.onmouseover = function () {
        swiper.current?.swiper?.autoplay?.stop();
      };
      //鼠标离开开始自动切换
      swiper.current.onmouseout = function () {
        swiper.current?.swiper?.autoplay?.start();
      };
    }
  }, [length]);

  return (
    <div className={styles.waybillContainer}>
      <div style={{ width: '100%' }}>
        <div className={styles.tableView}>
          <div className={styles.header}>
            {columns && columns?.length ? (
              <div key={index} className={styles.content}>
                {columns.map(item => {
                  return (
                    <div
                      className={styles.amount}
                      key={item.id}
                      style={
                        {
                          ...theme.typography.p2,
                          lineHeight: '19px',
                        } as CSSProperties
                      }
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className={styles.waybillTable}>
            {data?.length && columns?.length ? (
              <Swiper direction="vertical" {...params} containerClass={styles.swiper} ref={swiper}>
                {data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.content}
                      style={
                        {
                          ...theme.typography.p2,
                          lineHeight: '19px',
                        } as CSSProperties
                      }
                    >
                      {columns.map(term => {
                        return (
                          <div className={styles.amount} key={term.id}>
                            {item?.[term?.dataIndex]}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </Swiper>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
