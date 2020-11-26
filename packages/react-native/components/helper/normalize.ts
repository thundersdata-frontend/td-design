import { PixelRatio, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

/** design based on iphone6 */
const defaultPixelRatio = 2;
const designWidth = 750;
const designHeight = 1334;

// px转换成dp
const dpWidth = designWidth / defaultPixelRatio;
const dpHeight = designHeight / defaultPixelRatio;

//获取缩放比例
const scale = Math.round(Math.min(height / dpHeight, width / dpWidth));

const pixelRatio = PixelRatio.get();
const fontScale = PixelRatio.getFontScale();

export const deviceWidth = width;
export const deviceHeight = height;
export const ONE_PIXEL = StyleSheet.hairlineWidth;

export const px = (size: number, scaleWithSystem = false) => {
  if (scaleWithSystem) {
    return PixelRatio.roundToNearestPixel((size * scale) / fontScale);
  }
  return PixelRatio.roundToNearestPixel(size * scale);
};
