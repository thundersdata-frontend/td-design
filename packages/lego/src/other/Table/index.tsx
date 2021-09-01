import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import Swiper, { SwiperRefNode } from 'react-id-swiper';
import 'swiper/components/pagination/pagination.less';
import './index.less';
import { ReactNode } from 'react';
import { useRAF } from '../../hooks/useRAF';
import useTheme from '../../hooks/useTheme';

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
  const theme = useTheme();
  const swiper = useRef<SwiperRefNode>(null);
  const [index, setIndex] = useState(0);
  const [stop, setStop] = useState(false);
  const params = {
    height: 90,
    slidesPerView: 3,
    loop: true,
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
    if (stop) return;
    const interval = raf.setInterval(() => {
      updateIndex();
    }, speed);
    return () => raf.clearInterval(interval);
  }, [raf, speed, updateIndex, stop]);

  useEffect(() => {
    if (swiper && swiper.current) {
      //鼠标覆盖停止自动切换
      swiper.current.onmouseover = function () {
        setStop(true);
      };
      //鼠标离开开始自动切换
      swiper.current.onmouseout = function () {
        setStop(false);
      };
    }
  }, [length]);

  return (
    <div className="td-lego-table-container">
      <div style={{ width: '100%' }}>
        <div className="table-view">
          <div className="header">
            {columns && columns?.length ? (
              <div key={index} className="content">
                {columns.map(item => {
                  return (
                    <div
                      className="text"
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
          <div className="waybill-table">
            {data?.length && columns?.length ? (
              <Swiper direction="vertical" {...params} containerClass="table-swiper" ref={swiper}>
                {data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="content"
                      style={
                        {
                          ...theme.typography.p2,
                          lineHeight: '19px',
                        } as CSSProperties
                      }
                    >
                      {columns.map(term => {
                        return (
                          <div className="text" key={term.id}>
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
