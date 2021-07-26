import { NavigationProp, RouteProp } from '@react-navigation/native';

export type ParamList = {
  Homepage: undefined;
  ImagePickerDemo: undefined;
  ImagePickerFormDemo: undefined;
};
export interface ScreenProps {
  route: RouteProp<ParamList, keyof ParamList>;
  navigation: NavigationProp<ParamList, keyof ParamList>;
}
