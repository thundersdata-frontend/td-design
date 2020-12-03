/**
 * 单个评分组件
 */
import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useValue,
  sub,
  useCode,
  cond,
  eq,
  set,
  SpringUtils,
  not,
  clockRunning,
} from 'react-native-reanimated';
import { spring, useClock } from 'react-native-redash';
import { Theme } from '../../config/theme';
import { StarProps } from '../type';

const STAR_IMAGE = require('../images/airbnb-star.png');
const STAR_SELECTED_IMAGE = require('../images/airbnb-star-selected.png');

const Star: FC<StarProps> = ({
  fill,
  size,
  selectedColor,
  disabled,
  starStyle,
  outRangeScale,
  position,
  onSelectStarInPosition,
}) => {
  const theme = useTheme<Theme>();
  const selected = useValue<number>(0);
  const scale = useValue<number>(1);
  const clock = useClock();

  useCode(
    () => [
      cond(eq(selected, 1), [
        set(scale, outRangeScale),
        set(scale, spring({ from: outRangeScale, to: 1, clock, config: SpringUtils.makeDefaultConfig() })),
      ]),
      cond(not(clockRunning(clock)), [set(selected, 0)]),
    ],
    []
  );

  const handlePress = () => {
    selected.setValue(sub(1, selected));
    onSelectStarInPosition?.(position);
  };

  const source = fill && selectedColor === null ? STAR_SELECTED_IMAGE : STAR_IMAGE;
  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePress} disabled={disabled}>
      <Animated.Image
        source={source}
        style={[
          {
            margin: theme.spacing.xs,
            tintColor: fill && selectedColor ? selectedColor : undefined,
            width: size,
            height: size,
            transform: [{ scale }],
          },
          starStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

export default Star;
