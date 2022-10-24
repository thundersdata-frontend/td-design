import { helpers } from '@td-design/react-native';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { ViewToken } from 'react-native';

import { CALENDAR_HEIGHT } from '../../constant';
import { CalendarListProps, RowItem } from '../../type';

const { deviceWidth } = helpers;
export default function useCalendarList({
  current = dayjs(),
  pastScrollRange = 12,
  futureScrollRange = 12,
  horizontal = false,
  calendarWidth = deviceWidth,
  calendarHeight = CALENDAR_HEIGHT,
}: CalendarListProps) {
  const [rows, setRows] = useSafeState<RowItem[]>([]);
  const [currentDate] = useSafeState<Dayjs>(current);

  useEffect(() => {
    const _rows: RowItem[] = [];

    new Array(pastScrollRange + futureScrollRange).fill('').map((_, i) => {
      const rangeDate = currentDate.add(i - pastScrollRange, 'month');

      if ((pastScrollRange - 1 <= i && i <= pastScrollRange + 1) || (!pastScrollRange && i <= pastScrollRange + 2)) {
        _rows.push({ date: rangeDate, isShowDate: true });
      } else {
        _rows.push({ date: rangeDate, isShowDate: false });
      }
    });

    setRows(_rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, pastScrollRange, futureScrollRange]);

  const getItemLayout = (_: RowItem[] | null | undefined, index: number) => {
    return {
      length: horizontal ? calendarWidth : calendarHeight,
      offset: (horizontal ? calendarWidth : calendarHeight) * index,
      index,
    };
  };

  const rowIsCloseToViewable = (index: number, distance: number, viewableItems: Array<ViewToken>) => {
    for (let i = 0; i < viewableItems.length; i++) {
      if (Math.abs(index - viewableItems[i].index!) <= distance) {
        return true;
      }
    }
    return false;
  };

  const handleViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    setRows(rows => {
      const newRows: RowItem[] = [];

      rows.map((item, index) => {
        let val = item.date;
        const rowShouldBeRendered = rowIsCloseToViewable(index, 1, viewableItems);

        if (rowShouldBeRendered && !item.isShowDate) {
          val = current.add(index - pastScrollRange, 'month');
          newRows.push({ date: val, isShowDate: true });
        } else if (!rowShouldBeRendered) {
          newRows.push({ date: val, isShowDate: false });
        } else {
          newRows.push({ date: val, isShowDate: true });
        }
      });

      return newRows;
    });
  };

  return {
    rows,
    getItemLayout: useMemoizedFn(getItemLayout),
    handleViewableItemsChanged: useMemoizedFn(handleViewableItemsChanged),
  };
}
