import { ReactElement } from 'react';
import { StyleProp, TextStyle } from 'react-native';

export interface Action<T = StyleProp<TextStyle>> {
  text: string;
  onPress?: () => void | Promise<void>;
  style?: T;
}

export interface AlertProps {
  title: string;
  content?: string;
  actions?: Action[];
}

export interface PromptProps extends Omit<AlertProps, 'actions'> {
  input: ReactElement;
  onOk?: (value: string) => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  okText?: string;
  cancelText?: string;
}
