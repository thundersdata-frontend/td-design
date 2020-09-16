import {
  PickerItemProps,
  PickerProps,
  ItemValue,
} from '@react-native-community/picker/typings/Picker';
import { StyleProp, ViewStyle } from 'react-native';

export interface PickerProps {
  data: PickerItemProps[];
  itemSpace?: number;
  textSize?: number;
  textColor?: string;
  value?: ItemValue;
  onChange?: (selectedValue?: ItemValue) => void;
  style?: StyleProp<ViewStyle>;
}
export interface WheelCurvedPickerProps extends Omit<PickerProps, 'onValueChange'> {
  data: PickerItemProps[];
  itemSpace?: number;
  textSize?: number;
  textColor?: string;
  onValueChange?: (selectedValue?: ItemValue) => void;
}

export interface ModalPickerProps {
  title?: string;
  displayType?: 'view' | 'modal';
  visible?: boolean;
  onClose?: () => void;
}

export { ItemValue, PickerItemProps };
