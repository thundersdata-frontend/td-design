import type { NavigationProp, RouteProp } from '@react-navigation/native';

export type ParamList = {
  Homepage: undefined;
  AMapPOIAroundSearch: undefined;
  AMapPOIKeywordsSearch: undefined;
};
export interface ScreenProps {
  route: RouteProp<ParamList, keyof ParamList>;
  navigation: NavigationProp<ParamList, keyof ParamList>;
}
