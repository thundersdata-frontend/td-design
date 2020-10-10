import React, { FC } from 'react';
import Animated, {
  block,
  Easing,
  useCode,
  useValue,
  set,
  add,
  cond,
  not,
  clockRunning,
  startClock,
  stopClock,
  timing,
  neq,
} from 'react-native-reanimated';
import { mix, withTransition, useClock } from 'react-native-redash/lib/module/v1';
import Box from '../box';
import Flex from '../flex';
import Text from '../text';
import { px } from '../helper';
import { VerticalNoticeProps } from './type';

const ITEM_HEIGHT = px(36);
const VerticalNotice: FC<VerticalNoticeProps> = props => {
  const { data, delay = 1000, duration = 300, icon, closed } = props;
  const length = data.length;

  const index = useValue(0);
  const clock = useClock();

  const state = {
    finished: useValue(0),
    position: useValue(0),
    time: useValue(0),
    frameTime: useValue(0),
  };
  const config = {
    toValue: useValue(1),
    duration: delay,
    easing: Easing.inOut(Easing.ease),
  };

  useCode(
    () =>
      block([
        cond(
          neq(closed, 1),
          block([
            cond(not(clockRunning(clock)), startClock(clock)),
            timing(clock, state, config),
            cond(state.finished, [
              set(state.finished, 0),
              set(state.time, 0),
              set(state.frameTime, 0),
              set(config.toValue, cond(config.toValue, 0, 1)),
              cond(neq(index, length - 1), set(index, add(index, 1)), set(index, 0)),
            ]),
          ]),
          stopClock(clock)
        ),
      ]),
    []
  );

  const animation = withTransition(index, { duration, easing: Easing.linear });
  const translateY = mix(animation, 0, -ITEM_HEIGHT);

  return (
    <>
      <Box
        height={px(36)}
        position="absolute"
        zIndex="notice"
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
