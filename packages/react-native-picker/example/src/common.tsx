import { NavigationProp, RouteProp } from '@react-navigation/native';

export type ParamList = {
  Homepage: undefined;
  NormalPickerDemo: undefined;
  CascadePickerDemo: undefined;
  PickerItemDemo: undefined;
};
export interface ScreenProps {
  route: RouteProp<ParamList, keyof ParamList>;
  navigation: NavigationProp<ParamList, keyof ParamList>;
}
