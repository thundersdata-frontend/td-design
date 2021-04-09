import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { PeriodProps } from './type';
import { DAY_WIDTH } from './constant';
import { useTheme, Theme, helpers, Flex, Text } from '@td-design/react-native';

const { px } = helpers;
const HEIGHT = DAY_WIDTH + px(20);

const Period: React.FC<PeriodProps> = ({ state, date, marking, onPress, children }) => {
  const theme = useTheme<Theme>();
  const { selected, disabled, startingDay, endingDay, extra } = marking;

  const isDisabled = state === 'disabled' || disabled;
  const isToday = state === 'today';

  const onDayPress = () => {
    if (!isDisabled) {
      onPress(date);
    }
  };

  const fillers = useMemo(() => {
    const isStart = startingDay && !endingDay;
    const isEnd = !startingDay && endingDay;

    const startStyle = {
      borderTopLeftRadius: theme.borderRadii.base,
      borderBottomLeftRadius: theme.borderRadii.base,
    };
    const endStyle = {
      borderTopRightRadius: theme.borderRadii.base,
      borderBottomRightRadius: theme.borderRadii.base,
    };
    const filledStyle = {
      backgroundColor: theme.colors.calendar_background_fill,
    };
    const notFilledStyle = {
      backgroundColor: theme.colors.calendar_background_period,
    };

    if (!selected) return null;
    return (
      <Flex style={[styles.fillBlock, !startingDay && !endingDay && notFilledStyle]}>
        <View style={[styles.fillItem, isStart ? filledStyle : notFilledStyle, isStart && startStyle]} />
        <View style={[styles.fillItem, isEnd ? filledStyle : notFilledStyle, isEnd && endStyle]} />
      </Flex>
    );
  }, [
    startingDay,
    endingDay,
    theme.borderRadii.base,
    theme.colors.calendar_background_fill,
    theme.colors.calendar_background_period,
    selected,
  ]);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onDayPress} style={{ flex: 1, height: HEIGHT }}>
      <Flex justifyContent="center" style={{ width: '100%', height: DAY_WIDTH }}>
        {fillers}
        <Flex
          justifyContent="center"
          style={[
            { width: DAY_WIDTH, height: DAY_WIDTH },
            selected && { borderRadius: theme.borderRadii.base },
            selected &&
              (startingDay || endingDay) && {
                backgroundColor: theme.colors.calendar_background_selected,
              },
          ]}
        >
          <Text
            variant="number5"
            style={[
              selected && (startingDay || endingDay) && { color: theme.colors.white },
              isDisabled && { color: theme.colors.calendar_text },
              isToday && { color: theme.colors.calendar_text_selected },
            ]}
          >
            {String(children)}
          </Text>
        </Flex>
      </Flex>
      <Flex style={styles.extra} justifyContent="center">
        {typeof extra === 'string' ? <Text variant="support4">{extra}</Text> : extra}
      </Flex>
    </TouchableOpacity>
  );
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
  extra: {
    position: 'absolute',
    top: DAY_WIDTH + px(2),
    left: 0,
    right: 0,
  },
});

export default React.memo(Period);
