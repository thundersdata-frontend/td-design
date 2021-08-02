export type ColumnsProps = {
  /** 唯一值，同antd中的dataIndex */
  dataIndex: string;
  /** 表头标题 */
  title?: string;
  /** 根据对应columns的key渲染数据 */
  key?: string;
  /** 同antd中的render() */
  render?: (record: object) => string | JSX.Element;
  /** 宽度百分比 */
  width?: number | string;
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
};

/**
 * 每列计算出百分比宽度
 * @param columns
 */
export const getColumnsWithWidth = (columns: ColumnsProps[]) => {
  const filterColumns = columns
    .filter((item: ColumnsProps) => !!item.width)
    .map((item: ColumnsProps) => item.width) as number[];
  const count: number =
    filterColumns?.length > 0 ? filterColumns.reduce((pre: number, next: number) => pre! + next!) : 0;
  const restLength = columns.length - filterColumns.length;
  const residualMean = restLength > 0 ? (100 - count!) / restLength : 0;
  return columns.map((item: ColumnsProps) => ({
    ...item,
    width: `${item.width || residualMean}%`,
  }));
};
