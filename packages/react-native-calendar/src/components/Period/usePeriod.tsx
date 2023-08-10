import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Flex, Theme, useTheme } from '@td-design/react-native';
import { useMemoizedFn } from '@td-design/rn-hooks';

import { DAY_WIDTH } from '../../constant';
import { PeriodProps } from '../../type';

export default function usePeriod({ state, date, marking, onPress }: Omit<PeriodProps, 'activeOpacity'>) {
  const theme = useTheme<Theme>();
  const { selected, disabled, startingDay, endingDay, extra } = marking;

  const isDisabled = state === 'disabled' || disabled;
  const isToday = state === 'today';

  const onDayPress = () => {
    if (!isDisabled) {
      onPress?.(date);
    }
  };

  const styles = StyleSheet.create({
    fillBlock: {
      position: 'absolute',
      height: DAY_WIDTH,
      left: 0,
      right: 0,
    },
    fillItem: {
      height: DAY_WIDTH,
      flex: 1,
    },
  });

  const filters = useMemo(() => {
    const isStart = startingDay && !endingDay;
    const isEnd = !startingDay && endingDay;

    const startStyle = {
      borderTopLeftRadius: theme.borderRadii.x1,
      borderBottomLeftRadius: theme.borderRadii.x1,
    };
    const endStyle = {
      borderTopRightRadius: theme.borderRadii.x1,
      borderBottomRightRadius: theme.borderRadii.x1,
    };
    const filledStyle = {
      backgroundColor: theme.colors.background,
    };
    const notFilledStyle = {
      backgroundColor: theme.colors.primary50,
    };

    if (!selected) return null;
    return (
      <Flex style={[styles.fillBlock, !startingDay && !endingDay && notFilledStyle]}>
        <View style={[styles.fillItem, isStart ? filledStyle : notFilledStyle, isStart && startStyle]} />
        <View style={[styles.fillItem, isEnd ? filledStyle : notFilledStyle, isEnd && endStyle]} />
      </Flex>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingDay, endingDay, selected]);

  return {
    theme,
    onDayPress: useMemoizedFn(onDayPress),
    filters,
    selected,
    startingDay,
    endingDay,
    isDisabled,
    isToday,
    extra,
  };
}
