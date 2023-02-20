import { useMemo } from 'react';
import { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { helpers } from '@td-design/react-native';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import { DAY_WIDTH } from '../../constant';
import { getRows } from '../../dateUtils';
import { AgendaProps, Item } from '../../type';

const { px } = helpers;
const dayItemHeight = DAY_WIDTH + px(16);
export default function useAgenda<ItemT extends Item>({ firstDay }: Pick<AgendaProps<ItemT>, 'firstDay'>) {
  const [currentMonth, setCurrentMonth] = useSafeState(dayjs());

  const expanded = useSharedValue(false);
  const animation = useDerivedValue(() => (expanded.value ? withTiming(1) : withTiming(0)));

  const handleMonthChange = (month: string) => {
    setCurrentMonth(dayjs(month + '-01'));
  };

  const y = useMemo(() => {
    const rows = getRows(currentMonth, firstDay);
    return rows * dayItemHeight;
  }, [currentMonth, firstDay]);

  const contentStyle = useAnimatedStyle(() => ({
    height: mix(animation.value, y, 0),
  }));

  const iconWrapStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${mix(animation.value, 0, Math.PI)}rad` }],
  }));

  return { contentStyle, iconWrapStyle, expanded, handleMonthChange: useMemoizedFn(handleMonthChange) };
}
