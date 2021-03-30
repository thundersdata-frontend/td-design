import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import type Animated from 'react-native-reanimated';

export interface TapRatingProps {
  /** 默认分数  */
  defaultRating?: number;
  /** 评分总数，默认为5 */
  count?: number;
  /** 是否显示文字，默认为true */
  showReview?: boolean;
  /** 文字大小，默认25 */
  reviewSize?: number;
  /** 文字颜色，默认同评分选中颜色 */
  reviewColor?: string;
  /** 文字数组，默认为['非常差', '很差', '一般', '很好', '非常好'] */
  reviews?: string[];
  /** 评分大小，默认为40 */
  size?: number;
  /** 是否禁用选择，默认为false */
  disabled?: boolean;
  /** 评分样式 */
  starStyle?: StyleProp<Animated.AnimateStyle<ImageStyle>>;
  /** 评分选中颜色 */
  selectedColor?: string;
  /** 评分未选中时的颜色 */
  unselectedColor?: string;
  /** 评分点击时缩放大小 */
  outRangeScale?: number;
  /** 评分结束时的回调事件 */
  onFinishRating?: (rating: number) => void;
}

export type StarProps = Required<
  Pick<TapRatingProps, 'size' | 'disabled' | 'selectedColor' | 'unselectedColor' | 'outRangeScale'>
> &
  Pick<TapRatingProps, 'starStyle'> & {
    /** 是否填充选中颜色 */
    fill?: boolean;
    /** 当前评分分数 */
    position: number;
    /** 修改评分分数 */
    onSelectStarInPosition: (position: number) => void;
  };

export interface SwipeRatingProps {
  /** 评分图片 */
  ratingImage?: ImageSourcePropType;
  /** 评分颜色 */
  ratingColor?: string;
  /** 评分背景色 */
  ratingBgColor?: string;
  /** 评分总数 */
  count?: number;
  /** 背景色 */
  tintColor?: string;
  /** 评分大小 */
  size?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 默认选中评分，默认为count / 2 */
  defaultRating?: number;
  /** 评分最小值 */
  minValue?: number;
  /** 小数位数 */
  fractions?: number;
  /** 评分结束时的回调事件 */
  onFinishRating?: (rating: number) => void;
}
