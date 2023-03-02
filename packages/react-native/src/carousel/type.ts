import { PropsWithChildren } from 'react';

export type AlignType = 'left' | 'center' | 'right';
export type CarouselProps = PropsWithChildren<{
  /** 自动滚动 */
  auto?: boolean;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 停留时长 */
  duration?: number;
  /** 是否显示原点指示器 */
  indicatorEnabled?: boolean;
  /** 指示器大小 */
  indicatorSize?: number;
  /** 原点选中时颜色 */
  activeColor?: string;
  /** 原点未选中时颜色 */
  inactiveColor?: string;
  /** 指示器位置 */
  align?: AlignType;
}>;
