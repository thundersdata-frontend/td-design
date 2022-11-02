import classnames from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { memo, ReactElement, ReactNode } from 'react';
import { Autoplay } from 'swiper';
import 'swiper/modules/pagination/pagination.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import useTheme from '../../hooks/useTheme';
import './index.less';

export type TextAlign = 'center' | 'left' | 'right';

export type Column<T = any> = {
  title: string;
  dataIndex: string;
  id?: number | string;
  width?: number;
  flex?: number;
  /** 文字对齐方式 */
  textAlign?: TextAlign;
  render?: (data: T) => ReactElement;
};

export type CustomTableProps<T> = {
  /** 列数据 */
  columns: Column<T>[];
  /** 数据源 */
  data: T[];
  /** 容器高度 */
  height: number;
  /** 每屏显示几条数据 */
  countPerview: number;
  /** 速度（ms） */
  speed?: number;
  /** 自动轮播 */
  autoplay?: boolean;
  /** 是否在弹窗中 */
  inModal?: boolean;
  /** 背景颜色 */
  colors?: [string, string] | [string, string, string];
  /** 表头的类 */
  headerClass?: string;
  /** 内容的class */
  contentClass?: string;
};

function Table<T extends Record<string, any>>({
  columns = [],
  data = [],
  height,
  countPerview,
  speed = 1000,
  autoplay = true,
  inModal = false,
  colors = ['rgba(51, 64, 146, 1)', 'rgba(35, 40, 129, 1)'],
  headerClass,
  contentClass,
}: CustomTableProps<T>) {
  const theme = useTheme();

  const cellStyle = ({ width, flex }: { width: number | string; flex?: number }) => {
    if (flex) {
      return { flex };
    }

    return { width };
  };

  const slidesPerViewParams = countPerview > data.length ? data.length : countPerview;
  const lineHeight = height / slidesPerViewParams;

  return (
    <div className="td-lego-table-container">
      <div style={{ width: '100%' }}>
        <div className="table-view">
          <div
            className={classnames('td-lego-table-header', headerClass)}
            style={{ backgroundColor: colors?.[2] ?? colors?.[1] }}
          >
            {!isEmpty(columns) && (
              <div className="td-lego-table-content" style={{ height: lineHeight }}>
                {columns.map(item => {
                  return (
                    <div
                      className="text"
                      key={item.id}
                      style={{
                        ...theme.typography[inModal ? 'p0' : 'p2'],
                        lineHeight: inModal ? '25px' : '19px',
                        textAlign: item.textAlign,
                        ...cellStyle({
                          width: item.width || `${100 / columns?.length}%`,
                          flex: item.flex,
                        }),
                      }}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div
            className={classnames('td-lego-table-waybill-table', contentClass)}
            style={{
              // 如果直接设置background，切换colors会报错（background和backgroundSize属性冲突）
              backgroundImage: `linear-gradient( ${colors[0]} 50%, ${colors[1]} 0)`,
              backgroundSize: `100% ${2 * lineHeight}px`,
              height,
              overflow: autoplay ? 'hidden' : 'auto',
            }}
          >
            {!isEmpty(data) && !isEmpty(columns) && (
              <Container
                {...{
                  height,
                  countPerview: slidesPerViewParams,
                  lineHeight,
                  speed,
                  autoplay,
                }}
              >
                {data.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div
                        className="td-lego-table-content"
                        style={{
                          ...theme.typography[inModal ? 'p0' : 'p2'],
                          lineHeight: inModal ? '25px' : '19px',
                          height: lineHeight,
                        }}
                      >
                        {columns.map(term => {
                          return (
                            <div
                              key={term.id}
                              className="text"
                              style={{
                                ...cellStyle({
                                  width: term.width || `${100 / columns?.length}%`,
                                  flex: term.flex,
                                }),
                                textAlign: term.textAlign,
                              }}
                            >
                              {term.render ? term.render(item) : item?.[term.dataIndex]}
                            </div>
                          );
                        })}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Container>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Container = memo(
  ({
    height,
    countPerview,
    lineHeight,
    autoplay,
    speed,
    children,
  }: {
    height: number;
    countPerview: number;
    lineHeight: number;
    autoplay: boolean;
    speed: number;
    children: ReactNode;
  }) => {
    return (
      <Swiper
        direction={'vertical'}
        modules={[Autoplay]}
        slidesPerView={countPerview}
        spaceBetween={0}
        loop
        autoplay={
          autoplay
            ? {
                delay: speed,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        style={{ height }}
      >
        {children}
      </Swiper>
    );
  }
);

export default Table;
