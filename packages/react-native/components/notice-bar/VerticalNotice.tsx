import React, { FC, useEffect, useState } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import { mix, useTransition } from 'react-native-redash';
import Box from '../box';
import Flex from '../flex';
import Text from '../text';
import { px } from '../helper';
import { VerticalNoticeProps } from './type';

const ITEM_HEIGHT = px(36);
const VerticalNotice: FC<VerticalNoticeProps> = props => {
  const { data, delay = 1500, duration = 300, icon } = props;
  const length = data.length;

  const [index, setIndex] = useState(0);

  const animation = useTransition(index, { duration, easing: Easing.linear });
  const translateY = mix(animation, 0, -ITEM_HEIGHT);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index === length - 1) {
        setIndex(0);
      } else {
        setIndex(index => index + 1);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [index, length, delay]);

  return (
    <>
      <Box
        height={px(36)}
        position="absolute"
        zIndex={9}
        left={0}
        paddingHorizontal="xs"
        justifyContent="center"
        backgroundColor="backgroundColor3"
      >
        {icon}
      </Box>
      <Box height={ITEM_HEIGHT} backgroundColor="backgroundColor3" paddingLeft="xxl">
        <Animated.View style={{ transform: [{ translateY }] }}>
          {data.map((item, index) => (
            <Flex key={index} height={ITEM_HEIGHT}>
              <Text variant="thirdTip">{item}</Text>
            </Flex>
          ))}
        </Animated.View>
      </Box>
    </>
  );
};

export default VerticalNotice;
