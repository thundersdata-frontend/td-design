import React from 'react';
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import dayjs from 'dayjs';

import useCalendar from './useCalendar';
import { CalendarProps } from '../../type';

const Calendar: React.FC<CalendarProps> = ({ enableSwipeMonths = true, ...restProps }) => {
  const { isFold, renderCalendar, handlerStateChange } = useCalendar(restProps);

  if (!enableSwipeMonths || !isFold) return <>{renderCalendar()}</>;
  return (
    <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={event => handlerStateChange(event, 'left')}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={event => handlerStateChange(event, 'right')}
      >
        {renderCalendar()}
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default React.memo(Calendar, (prevProps, nextProps) => {
  // 返回false才会触发渲染
  let shouldUpdate = true;

  if (prevProps.current?.format('YYYY-MM') !== nextProps.current?.format('YYYY-MM')) {
    shouldUpdate = false;
  }

  if (JSON.stringify(prevProps?.markedDates) !== JSON.stringify(nextProps?.markedDates)) {
    shouldUpdate = false;
  }

  shouldUpdate = [
    'hideExtraDays',
    'showSixWeeks',
    'showArrowLeft',
    'showArrowRight',
    'firstDay',
    'enableSwipeMonths',
    'contentStyle',
    'monthWrapperStyle',
  ].reduce((prev, next) => {
    if (!prev || nextProps[next] !== prevProps[next]) {
      return false;
    }
    return true;
  }, shouldUpdate);

  shouldUpdate = ['minDate', 'maxDate'].reduce((prev, next) => {
    const prevDate = prevProps[next];
    const nextDate = nextProps[next];
    if (!prev) {
      return false;
    } else if (prevDate !== nextDate) {
      if (prevDate && nextDate && dayjs(prevDate).format('YYYY-MM') === dayjs(nextDate).format('YYYY-MM')) {
        return true;
      } else {
        return false;
      }
    }
    return prev;
  }, shouldUpdate);

  return shouldUpdate;
});
