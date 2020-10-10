import { ReactNode } from 'react';
import Animated from 'react-native-reanimated';

export interface NoticeBarProps {
  /** 左侧自定义图标 */
  icon?: ReactNode;
  /** 通知栏内容 */
  data: string[];
  /** 通知栏模式。close表示可关闭；link表示可点击；默认为空 */
  mode?: 'close' | 'link' | '';
  /** 点击事件 */
  onPress?: () => void;
  /** 关闭事件 */
  onClose?: () => void | Promise<void>;
  /** 是否显示滚动动画 */
  animation?: boolean;
  /** 滚动周期 */
  duration?: number;
  /** 显示时间 */
  delay?: number;
}

export type VerticalNoticeProps = Pick<NoticeBarProps, 'icon' | 'duration' | 'data' | 'delay'> & {
  closed: Animated.Node<number>;
};
export type HorizontalNoticeProps = Pick<NoticeBarProps, 'icon' | 'duration' | 'data' | 'animation'> & {
  closed: Animated.Node<number>;
};
