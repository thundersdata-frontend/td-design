import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ModalProps = PropsWithChildren<{
  /** 是否显示弹窗 */
  visible: boolean;
  /** 关闭弹窗事件 */
  onClose: () => void;
  /** 蒙层是否允许点击关闭弹窗 */
  maskClosable?: boolean;
  /** 是否显示蒙层背景 */
  maskVisible?: boolean;
  /** 弹窗显示/关闭时间 */
  duration?: number;
  /** 内容显示位置。bottom在底部；center在中间；fullscreen全屏显示 */
  position?: 'bottom' | 'center' | 'fullscreen';
  bodyContainerStyle?: StyleProp<ViewStyle>;
}>;

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
  content?: ReactNode;
  /** 确认事件 */
  onPress: () => void | Promise<void>;
}

export interface ConfirmProps extends Omit<AlertProps, 'onPress'> {
  /** 警示性图标 */
  icon?: ReactNode;
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
  onOk?: (value?: string) => void | Promise<void>;
}

export type TipProps = Omit<AlertProps, 'icon'> & {
  /** 背景图 */
  img: ImageSourcePropType;
  /** 高度 */
  height: number;
};
