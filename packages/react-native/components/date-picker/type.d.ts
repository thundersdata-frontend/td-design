import { SyntheticEvent } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PickerItemProps, ModalPickerProps } from '../picker/type';

export type DatePickerMode = 'date' | 'time';
export type Event = SyntheticEvent<
  Readonly<{
    timestamp: number;
  }>
>;

export interface DatePickerProps {
  display?: string;
  labelUnit?: { year: string; month: string; day: string };
  mode?: DatePickerMode;
  value?: Date;
  onChange?: (date?: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  itemSpace?: number;
  textSize?: number;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
}

export { PickerItemProps, ModalPickerProps };
