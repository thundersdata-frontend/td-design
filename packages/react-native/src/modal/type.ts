import { ReactElement, ReactNode } from 'react';
import { ImageSourcePropType, StyleProp, TextStyle } from 'react-native';

export interface Action<T = StyleProp<TextStyle>> {
  text: string;
  onPress?: () => void | Promise<void>;
  style?: T;
}

export interface AlertProps {
  /** 警示性图标 */
  icon?: ReactNode;
  /** 标题 */
  title: string;
  /** 内容 */
  content?: string;
}

export interface ConfirmProps extends AlertProps {
  /** 确认事件 */
  onOk?: () => void | Promise<void>;
  /** 取消事件 */
  onCancel?: () => void | Promise<void>;
  /** 确认文本 */
  okText?: string;
  /** 取消文本 */
  cancelText?: string;
}

export interface PromptProps extends Omit<ConfirmProps, 'icon' | 'onOk'> {
  input: ReactElement;
  onOk?: (value: string) => void | Promise<void>;
}

export type TipProps = Omit<AlertProps, 'icon'> & {
  /** 背景图 */
  img: ImageSourcePropType;
  /** 高度 */
  height: number;
};
