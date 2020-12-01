/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈英杰
 * @Date: 2020-11-27 18:01:56
 * @LastEditors: 陈英杰
 * @LastEditTime: 2020-12-01 16:43:14
 */

export interface TableProps {
  // table 的边框颜色
  borderColor?: string;
  // table 的边框粗细
  borderWidth?: number;
  // table 单元格的分配
  flexArr?: Array<number>;
  // table 单元格的长度
  widthArr?: Array<number>;
  // table 文字样式
  textStyle?: TextStyle;
  // table 容器样式
  tableStyle?: ViewStyle;
  // table 每一个单元格样式
  cellStyle?: ViewStyle;
}

export interface RowProps {
  // 行数据
  data?: Array<string>;
  // 行内单元格的分配
  flexArr?: Array<number>;
  // 行内单元格的宽
  widthArr?: Array<number>;
  // 行内文字样式
  textStyle?: TextStyle;
  //  行容器样式
  rowStyle?: ViewStyle;
  // 行内每一个单元格样式
  cellStyle?: ViewStyle;
}

export interface CellProps {
  // 单元格数据
  data?: string | ReactNode;
  //单元格分配
  flex?: number;
  //单元格宽
  width?: number;
  //单元格文字样式
  textStyle?: TextStyle;
  //单元格样式
  cellStyle?: ViewStyle;
}
