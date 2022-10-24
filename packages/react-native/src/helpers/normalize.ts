import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

/** design based on iphone6 */
const defaultPixelRatio = 1;
const designWidth = 375;
const designHeight = 667;

// px转换成dp
const dpWidth = designWidth / defaultPixelRatio;
const dpHeight = designHeight / defaultPixelRatio;

//获取缩放比例
const scale = Math.min(height / dpHeight, width / dpWidth);

export const deviceWidth = width;
export const deviceHeight = height;
export const ONE_PIXEL = StyleSheet.hairlineWidth;

/**
 * 适配屏幕大小和像素密度的公共方法
 * @param size 设计稿大小
 */
export const px = (size: number) => {
  return PixelRatio.roundToNearestPixel(size * scale);
};
