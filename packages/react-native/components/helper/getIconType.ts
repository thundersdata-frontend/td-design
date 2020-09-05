import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { isEmpty } from 'lodash-es';

export type IconType =
  | 'zocial'
  | 'octicon'
  | 'material'
  | 'material-community'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'font-awesome'
  | 'simple-line-icon'
  | 'feather'
  | 'ant-design'
  | 'fontisto'
  | 'custom';

const customIcon: { [key: string]: any } = {};
export const registerCustomIcon = (icon: any) => {
  customIcon.custom = icon;
};

export default (type?: IconType) => {
  switch (type) {
    case 'zocial':
      return ZocialIcon;
    case 'octicon':
      return OcticonIcon;
    case 'material':
      return MaterialIcon;
    case 'material-community':
      return MaterialCommunityIcon;
    case 'ionicon':
      return Ionicon;
    case 'foundation':
      return FoundationIcon;
    case 'evilicon':
      return EvilIcon;
    case 'entypo':
      return EntypoIcon;
    case 'font-awesome':
      return FAIcon;
    case 'simple-line-icon':
      return SimpleLineIcon;
    case 'feather':
      return FeatherIcon;
    case 'ant-design':
      return AntDesign;
    case 'fontisto':
      return Fontisto;
    case 'custom':
      if (!isEmpty(customIcon)) {
        return customIcon.custom;
      }
      return null;
    default:
      return AntDesign;
  }
};
