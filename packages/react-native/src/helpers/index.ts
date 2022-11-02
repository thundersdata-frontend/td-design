import { Platform, StyleProp } from 'react-native';

import { deviceHeight, deviceWidth, ONE_PIXEL, px } from './normalize';
import renderNode from './renderNode';

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

function hexToRgba(hex: string, alpha = 1) {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let arr = hex.substring(1).split('');
    if (arr.length == 3) {
      arr = [arr[0], arr[0], arr[1], arr[1], arr[2], arr[2]];
    }
    c = '0x' + arr.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${alpha})`;
  }
  throw new Error('Bad Hex');
}

export default {
  renderNode,
  px,
  deviceWidth,
  deviceHeight,
  ONE_PIXEL,
  isIOS,
  conditionalStyle,
  hexToRgba,
};
