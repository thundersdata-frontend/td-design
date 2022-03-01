import React, { FC, ReactNode } from 'react';
import Animated, {
  Easing,
  measure,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Chevron from './Chevron';
import helpers from '../helpers';
import Text from '../text';
import Box from '../box';
import Flex from '../flex';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { SectionHeaderProps, SectionProps } from './type';

const { ONE_PIXEL, px } = helpers;

export const sectionHeaderHeight = px(54);

const Panel: FC<SectionProps> = ({
  index,
  title,
  content,
  contentStyle,
  height,
  contentHeights,
  multiple,
  customIcon,
}) => {
  const animatedRef = useAnimatedRef();

  const panelStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: height.value }],
    };
  });

  return (
    <Animated.View style={[{ zIndex: index, position: 'absolute', width: '100%' }, panelStyle]}>
      <SectionHeader
        {...{ title, customIcon, index, multiple }}
        animatedRef={animatedRef}
        contentHeights={contentHeights}
      />
      <Box ref={animatedRef} style={contentStyle}>
        {typeof content === 'string' ? (
          <Text variant="p1" color="gray500">
            {content}
          </Text>
        ) : (
          content
        )}
      </Box>
    </Animated.View>
  );
};

function SectionHeader({ title, animatedRef, contentHeights, customIcon, index, multiple }: SectionHeaderProps) {
  const opened = useSharedValue(false);
  const progress = useDerivedValue(() => (opened.value ? withTiming(1) : withTiming(0)));

  const applyMeasure = ({ height }: ReturnType<typeof measure>) => {
    'worklet';
    const easing = Easing.bezierFn(0.25, 0.1, 0.25, 1);
    const contentHeight = contentHeights[index];

    if (contentHeight.value === 0) {
      contentHeight.value = withTiming(height, {
        duration: 500,
        easing,
      });
      if (!multiple) {
        contentHeights.forEach((item, idx) => {
          if (idx !== index) {
            item.value = withTiming(0, {
              duration: 300,
              easing,
            });
          }
        });
      }
    } else {
      contentHeight.value = withTiming(0, {
        duration: 300,
        easing,
      });
    }
  };

  const handler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onActive() {
      'worklet';
      opened.value = !opened.value;
      applyMeasure(measure(animatedRef));
    },
  });

  const renderTitle = (title: ReactNode) => {
    if (typeof title === 'string') {
      return (
        <Text variant="h2" color="gray500">
          {title}
        </Text>
      );
    }
    return title;
  };

  return (
    <TapGestureHandler onHandlerStateChange={handler}>
      <Animated.View>
        <Flex
          backgroundColor="background"
          justifyContent="space-between"
          padding="x3"
          borderBottomColor="border"
          borderBottomWidth={ONE_PIXEL}
          height={sectionHeaderHeight}
        >
          {renderTitle(title)}
          {customIcon ? customIcon({ progress }) : <Chevron {...{ progress }} />}
        </Flex>
      </Animated.View>
    </TapGestureHandler>
  );
}

export default Panel;
