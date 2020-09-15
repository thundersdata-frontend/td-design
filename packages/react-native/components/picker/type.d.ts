import {
  PickerItemProps,
  PickerProps,
  ItemValue,
} from '@react-native-community/picker/typings/Picker';

export interface WheelCurvedPickerProps extends PickerProps {
  data: PickerItemProps[];
  itemSpace?: number;
  textSize?: number;
  textColor?: string;
}

export { ItemValue, PickerItemProps };
