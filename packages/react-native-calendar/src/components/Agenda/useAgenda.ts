import dayjs from 'dayjs';
import { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { useCreation, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { helpers } from '@td-design/react-native';

import { getRows } from '../../dateUtils';
import { AgendaProps, Item } from '../../type';
import { DAY_WIDTH } from '../../constant';

const { px } = helpers;
const dayItemHeight = DAY_WIDTH + px(16);
export default function useAgenda<ItemT extends Item>({ firstDay }: Pick<AgendaProps<ItemT>, 'firstDay'>) {
  const [currentMonth, setCurrentMonth] = useSafeState(dayjs());

  const expanded = useSharedValue(false);
  const animation = useDerivedValue(() => (expanded.value ? withTiming(1) : withTiming(0)));

  const handleMonthChange = (month: string) => {
    setCurrentMonth(dayjs(month + '-01'));
  };

  const y = useCreation(() => {
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
