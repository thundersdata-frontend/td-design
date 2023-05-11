import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';

import { Flex, helpers, Text, Theme, useTheme } from '@td-design/react-native';

import Star from './components/Star';
import { TapRatingProps } from './type';
import useTapRating from './useTapRating';

const { px } = helpers;
const STAR_SIZE = px(40);

const TapRating = forwardRef<unknown, TapRatingProps>(
  (
    props,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref
  ) => {
    const theme = useTheme<Theme>();
    const {
      rating = 3,
      reviews = ['非常差', '很差', '一般', '很好', '非常好'],
      count = 5,
      showReview = true,
      reviewSize = px(25),
      onFinishRating,
      size = STAR_SIZE,
      disabled = false,
      starStyle,
      outRangeScale = 1.2,
      selectedColor = theme.colors.func200,
      reviewColor = selectedColor,
      unselectedColor = theme.colors.gray100,
    } = props;

    const { position, handleSelect } = useTapRating({ rating, onFinishRating });

    const styles = StyleSheet.create({
      text: {
        margin: px(10),
        fontWeight: 'bold',
        fontSize: reviewSize,
        color: reviewColor,
      },
    });

    return (
      <Flex flexDirection="column" alignItems="center" justifyContent="center" backgroundColor="transparent">
        {showReview && (
          <Text variant="h0" style={styles.text}>
            {reviews[position - 1]}
          </Text>
        )}
        <Flex justifyContent="center" alignItems="center">
          {Array(count)
            .fill('')
            .map((_, index) => (
              <Star
                key={index}
                position={index + 1}
                fill={position >= index + 1}
                onSelectStarInPosition={handleSelect}
                {...{ size, disabled, starStyle, selectedColor, unselectedColor, outRangeScale }}
              />
            ))}
        </Flex>
      </Flex>
    );
  }
);

export default TapRating;
