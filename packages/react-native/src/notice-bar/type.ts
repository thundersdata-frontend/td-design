import { ReactNode } from 'react';
import Animated from 'react-native-reanimated';

export interface NoticeBarProps {
  /** 左侧自定义图标 */
  icon?: ReactNode;
  /** 通知栏内容 */
  text: string;
  /** 通知栏模式。close表示可关闭；link表示可点击；默认为空 */
  mode?: 'close' | 'link' | '';
  /** 点击事件 */
  onPress?: () => void;
  /** 关闭事件 */
  onClose?: () => void | Promise<void>;
  /** 滚动时间 */
  duration?: number;
  /** 是否使用动画 */
  animation?: boolean;
  /** 高度 */
  height?: number;
}

export type AnimatedNoticeProps = Omit<NoticeBarProps, 'mode' | 'onPress' | 'onClose'> & {
  closed: Animated.Node<number>;
};
