export interface ProgressProps {
  /** 长度 */
  width?: number;
  /** 颜色 */
  color?: string | [string, string];
  /** 背景色 */
  bgColor?: string;
  /** 宽度 */
  strokeWidth?: number;
  /** 值 */
  value?: number;
  /** 是否显示值文本 */
  showLabel?: boolean;
  /** 值文本位置 */
  labelPosition?: 'right' | 'top';
  /** 是否显示单位 */
  showUnit?: boolean;
}
