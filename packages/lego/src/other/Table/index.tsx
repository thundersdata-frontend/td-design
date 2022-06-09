import React, { CSSProperties, memo, ReactElement } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import Swiper, { ReactIdSwiperChildren } from 'react-id-swiper';
import 'swiper/components/pagination/pagination.less';
import './index.less';
import useTheme from '../../hooks/useTheme';
import classnames from 'classnames';

SwiperCore.use([Autoplay]);

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
  /** 速度（ms） */
  speed?: number;
  /** 自动轮播 */
  autoLoop?: boolean;
  /** 是否在弹窗中 */
  inModal?: boolean;
  /** 自定义行高 */
  lineHeight?: number;
  /** 背景颜色 */
  colors?: [string, string] | [string, string, string];
  /** 除了表头的表格内容高度 */
  height?: number;
  /** 表头的类 */
  headerClass?: string;
  /** 内容的class */
  contentClass?: string;
};

function Table<T>({
  columns = [],
  data = [],
  speed = 3000,
  autoLoop = true,
  inModal = false,
  lineHeight = 30,
  height = 210,
  colors = ['rgba(51, 64, 146, 1)', 'rgba(35, 40, 129, 1)'],
  headerClass,
  contentClass,
}: CustomTableProps<T>) {
  const theme = useTheme();

  // 表格内容高度判断
  const getHeight = () => {
    if (height && data?.length) {
      // 数据高度
      const dataHeight = lineHeight * data?.length;
      // 如果数据高度比传递的高度更小，返回数据高度
      if (dataHeight < height) {
        return dataHeight;
      }
    }
    return height;
  };

  const cellStyle = ({ width, flex }: { width: number | string; flex?: number }) => {
    if (flex) {
      return { flex };
    }

    return { width };
  };

  return (
    <div className="td-lego-table-container">
      <div style={{ width: '100%' }}>
        <div className="table-view">
          <div
            className={classnames('td-lego-table-header', headerClass)}
            style={{ backgroundColor: colors?.[2] ?? colors?.[1] }}
          >
            {columns && columns?.length ? (
              <div className="td-lego-table-content" style={{ height: lineHeight }}>
                {columns.map(item => {
                  return (
                    <div
                      className="text"
                      key={item.id}
                      style={
                        {
                          ...theme.typography[inModal ? 'p0' : 'p2'],
                          lineHeight: inModal ? '25px' : '19px',
                          textAlign: item.textAlign,
                          ...cellStyle({ width: item.width || `${100 / columns?.length}%`, flex: item.flex }),
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
          <div
            className={classnames('td-lego-table-waybill-table', contentClass)}
            style={{
              background: `linear-gradient( ${colors[0]} 50%, ${colors[1]} 0)`,
              backgroundSize: `100% ${2 * lineHeight}px`,
              height: getHeight(),
              overflow: autoLoop ? 'hidden' : 'auto',
            }}
          >
            {data?.length && columns?.length ? (
              <Container {...{ lineHeight, speed, length: data.length, autoLoop }}>
                {data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="td-lego-table-content"
                      style={
                        {
                          ...theme.typography[inModal ? 'p0' : 'p2'],
                          lineHeight: inModal ? '25px' : '19px',
                          height: lineHeight,
                        } as CSSProperties
                      }
                    >
                      {columns.map(term => {
                        return (
                          <div
                            className="text"
                            key={term.id}
                            style={{
                              ...cellStyle({ width: term.width || `${100 / columns?.length}%`, flex: term.flex }),
                              textAlign: term.textAlign,
                            }}
                          >
                            {term.render ? term.render(item) : item?.[term?.dataIndex]}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </Container>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const Container = memo(
  ({
    autoLoop,
    length,
    speed,
    lineHeight,
    children,
  }: {
    autoLoop: boolean;
    length: number;
    speed: number;
    lineHeight: number;
    children: ReactIdSwiperChildren;
  }) => {
    if (autoLoop)
      return (
        <Swiper
          direction="vertical"
          loop={true}
          slidesPerView="auto"
          height={lineHeight * length}
          loopedSlides={length}
          autoplay={{ delay: speed, stopOnLastSlide: false, disableOnInteraction: true }}
          containerClass="table-swiper"
        >
          {children}
        </Swiper>
      );
    return <div>{children}</div>;
  }
);

export default Table;
