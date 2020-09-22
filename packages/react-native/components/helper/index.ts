import { Platform, StyleProp } from 'react-native';
import renderNode from './renderNode';
import getIconType, { registerCustomIcon } from './getIconType';
import { px, deviceWidth, deviceHeight, ONE_PIXEL } from './normalize';

/**
 * 判断是否是IOS系统
 */
const isIOS = Platform.OS === 'ios';

/**
 * 根据条件决定样式是否生效
 * @param condition
 * @param style
 */
const conditionalStyle = (condition: boolean, style: StyleProp<any>) => (condition ? style : {});

export {
  renderNode,
  getIconType,
  px,
  deviceWidth,
  deviceHeight,
  ONE_PIXEL,
  isIOS,
  conditionalStyle,
  registerCustomIcon,
};
