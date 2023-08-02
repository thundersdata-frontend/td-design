import { StyleProp, ViewStyle } from 'react-native';

export interface TimelineStepProps {
  /** 标题 */
  title: string;
  /** 介绍 */
  description?: string;
  /** 日期 */
  date: string;
  /** 时间 */
  time?: string;
}

export interface TimelineProps {
  /** 时间轴节点 */
  data: TimelineStepProps[];
  /** 时间轴方向 */
  direction?: 'horizontal' | 'vertical';
  /** 自定义icon */
  customIcon?: React.ReactElement;
  /** 线条样式 */
  lineStyle?: StyleProp<ViewStyle>;
}
