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
