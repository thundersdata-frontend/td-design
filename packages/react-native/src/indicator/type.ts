import { EasingFunction, StyleProp, ViewStyle } from 'react-native';

export interface BaseIndicatorProps {
  /**
   * Animation easing function
   * @default Easing.linear
   */
  animationEasing?: EasingFunction;

  /**
   * Animation duration in ms
   * @default 1200
   */
  animationDuration?: number;

  /**
   * Animation toggle
   * @default true
   */
  animating?: boolean;

  /**
   * Animation is interaction
   * @default true
   */
  interaction?: boolean;

  /**
   * Style is proxied to the underlying View
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Hide when not animating
   * @default true
   */
  hidesWhenStopped?: boolean;
}

export interface UIActivityIndicatorProps extends BaseIndicatorProps {
  /**
   * Component color
   * @default 'rgb(0, 0, 0)'
   */
  color?: string;
  /**
   * Component count
   * @default 12
   */
  count?: number;
  /**
   * Base component size
   * @default 36
   */
  size?: number;
}

export interface BallIndicatorProps extends BaseIndicatorProps {
  /**
   * Component color
   * @default 'rgb(0, 0, 0)'
   */
  color?: string;
  /**
   * Component count
   * @default 8
   */
  count?: number;
  /**
   * Base component size
   * @default 36
   */
  size?: number;
}
