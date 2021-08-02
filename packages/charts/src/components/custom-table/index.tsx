/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import AutoVerticalRoll from '../auto-verticalroll';
import { ColumnsProps, getColumnsWithWidth } from './utils';
import ComBlock from '../com-block';
import ComCard from '../com-card';

// 常量0
const ZERO = 0;

type CustomTableProps = {
  /** 标题 */
  title?: string;
  /** 列数组 */
  columns: ColumnsProps[];
  /** 表格数据源 */
  dataSource: object[];
  /** 允许scroll */
  enabledScroll?: boolean;
  /** 隐藏头部 */
  hideHeader?: boolean;
  /** 隐藏标题*/
  hideTitle?: boolean;
  /** 行内样式 */
  itemStyle?: CSSProperties;
  /** 整体样式 */
  style?: CSSProperties;
  /** 标题样式 */
  headerStyle?: CSSProperties;
  /** 滚动速度(px/s) */
  speed?: number;
  /** 单个数据行高度 */
  itemHeight?: number;
  /** 滚动触发事件 */
  onScrollChanged?: (index: number) => void;
};

const CustomTable: React.FC<CustomTableProps> = (props: CustomTableProps) => {
  const {
    title = '',
    hideTitle = false,
    columns = [],
    dataSource = [],
    enabledScroll = false,
    hideHeader = false,
    itemStyle,
    style,
    headerStyle,
    speed,
    itemHeight = 22.8,
    onScrollChanged,
  } = props;

  const transColumns = getColumnsWithWidth(columns);

  /** 根据key值生成表格体内容  3000:list长度太大会造成性能问题，当前项目限制为3000  */
  const renderTbody = (list: object[]) =>
    list.slice(0, 3000).map((item: object, index: number) => (
      <div
        key={index}
        id={index.toString()}
        className={classnames('bodyRow', index % 2 !== ZERO ? 'lightBlue' : {})}
        style={{ ...itemStyle, height: itemHeight }}
      >
        {transColumns.map(({ dataIndex, key, render, width = '100%', align = 'center' }: ColumnsProps) =>
          render ? (
            render(item)
          ) : (
            <span style={{ width, textAlign: align }} key={`${key}_${item[dataIndex]}`} className="tableCell">
              {item[dataIndex]}
            </span>
          )
        )}
      </div>
    ));

  /** 根据columns生成表格头内容 */
  const renderTableHeader = () => (
    <div className="header" style={headerStyle}>
      {transColumns.map(({ title, dataIndex, width = '100%', align = 'center' }: ColumnsProps) => {
        return (
          <span style={{ width, textAlign: align }} key={dataIndex} className="theadCell">
            <span className="tableCellContent">{title}</span>
          </span>
        );
      })}
    </div>
  );

  const content = (
    <div className="tdCustomTableContainer" style={style}>
      {hideHeader ? null : renderTableHeader()}
      {enabledScroll ? (
        <AutoVerticalRoll data={dataSource} isLoop speed={speed} itemHeight={itemHeight} onChange={onScrollChanged}>
          <div className="tableContent">{renderTbody(dataSource)}</div>
        </AutoVerticalRoll>
      ) : (
        <div className="tableContent">{renderTbody(dataSource)}</div>
      )}
    </div>
  );

  return hideTitle ? (
    content
  ) : (
    <ComBlock>
      <ComCard title={title}>{content}</ComCard>
    </ComBlock>
  );
};

export default CustomTable;
