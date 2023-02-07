import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type Position = 'left' | 'top' | 'right' | 'bottom';
export type CaretPosition = 'left' | 'center' | 'right';
export interface TooltipProps {
  /** 提示内容 */
  content: ReactNode;
  /** 显示隐藏的回调 */
  onVisibleChange?: (visible: boolean) => void;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 样式 */
  style?: ViewStyle;
  /** 位置 */
  position?: Position;
  /** 是否显示小三角 */
  caret?: boolean;
  /** 小三角位置 */
  caretPosition?: CaretPosition;
}
