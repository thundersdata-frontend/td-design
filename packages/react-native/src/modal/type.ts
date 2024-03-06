import { ReactElement, ReactNode } from 'react';
import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ModalProps {
  /** 弹窗是否可见 */
  visible: boolean;
  /** 点击mask是否可以关闭弹窗 */
  maskClosable?: boolean;
  /** 是否显示mask */
  maskVisible?: boolean;
  /** 弹窗动画 */
  animationType?: 'none' | 'fade' | 'slide-up' | 'slide-down';
  /** 弹窗内容样式 */
  bodyContainerStyle?: StyleProp<ViewStyle>;
  /** 关闭弹窗 */
  onClose?: () => void;
  /** 弹窗动画结束后执行 */
  onAnimationEnd?: (visible: boolean) => void;
  /** 在用户按下 Android 设备上的后退按键时触发 */
  onRequestClose?: () => boolean;
  /** 内容显示位置。bottom在底部；center在中间；fullscreen全屏显示 */
  position?: 'top' | 'bottom' | 'center' | 'fullscreen';
  /** 动画时长，默认为300ms */
  animationDuration?: number;
}

export interface Action<T = StyleProp<TextStyle>> {
  text: string;
  onPress?: () => void | Promise<void>;
  style?: T;
}

export interface AlertProps {
  /** 警示性图标 */
  icon?: ReactNode;
  /** 标题 */
  title: ReactNode;
  /** 内容 */
  content?: ReactNode;
  /** 按钮文本 */
  confirmText?: string;
  /** 确认事件 */
  onPress?: () => void | Promise<void>;
}

export interface ConfirmProps extends Omit<AlertProps, 'onPress' | 'confirmText'> {
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
  /** 自定义输入框组件 */
  input: ReactElement;
  onOk?: (value?: string) => void | Promise<void>;
}

export type TipProps = Omit<AlertProps, 'icon' | 'onPress' | 'confirmText'> & {
  /** 背景图 */
  img: ImageSourcePropType;
  /** 高度 */
  height: number;
  /** 关闭图标的不透明度 */
  closeIconActiveOpacity?: number;
};
