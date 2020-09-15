import {
  PickerItemProps,
  PickerProps,
  ItemValue,
} from '@react-native-community/picker/typings/Picker';

export interface WheelCurvedPickerProps extends Omit<PickerProps, 'onValueChange'> {
  data: PickerItemProps[];
  itemSpace?: number;
  textSize?: number;
  textColor?: string;
  onValueChange?: (selectedValue: ItemValue) => void;
}

export { ItemValue, PickerItemProps };
