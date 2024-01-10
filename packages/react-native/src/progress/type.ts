import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface ProgressProps {
  /** 长度 */
  width?: number;
  /** 颜色, 支持渐变 */
  color?: string | string[];
  /** 背景色 */
  bgColor?: string;
  /** 宽度 */
  strokeWidth?: number;
  /** 值 */
  value?: number;
  /** 值文本位置 */
  labelPosition?: 'right' | 'top';
  /** 是否显示单位 */
  unit?: string;
  /** 自定义文本 */
  label?: ReactNode;
  /** 是否显示文本 */
  showLabel?: boolean;
  /** 文本样式 */
  labelStyle?: StyleProp<ViewStyle>;
}
