import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Flex, helpers, Text } from '@td-design/react-native';

import { DAY_WIDTH } from '../../constant';
import { PeriodProps } from '../../type';
import usePeriod from './usePeriod';

const { px } = helpers;

const HEIGHT = DAY_WIDTH + px(20);

const Period: React.FC<PeriodProps> = ({ state, date, marking, onPress, children }) => {
  const { theme, onDayPress, filters, selected, startingDay, endingDay, isDisabled, isToday, extra } = usePeriod({
    state,
    date,
    marking,
    onPress,
  });

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onDayPress} style={{ flex: 1, height: HEIGHT }}>
      <Flex justifyContent="center" style={{ width: '100%', height: DAY_WIDTH }}>
        {filters}
        <Flex
          justifyContent="center"
          style={[
            { width: DAY_WIDTH, height: DAY_WIDTH },
            selected && { borderRadius: theme.borderRadii.x1 },
            selected &&
              (startingDay || endingDay) && {
                backgroundColor: theme.colors.primary200,
              },
          ]}
        >
          <Text
            variant="p1"
            color="gray500"
            style={[
              selected && (startingDay || endingDay) && { color: theme.colors.white },
              isDisabled && { color: theme.colors.gray200 },
              isToday && { color: theme.colors.primary200 },
            ]}
          >
            {String(children)}
          </Text>
        </Flex>
      </Flex>
      <Flex style={styles.extra} justifyContent="center">
        {typeof extra === 'string' ? (
          <Text variant="p3" color="primary200">
            {extra}
          </Text>
        ) : (
          extra
        )}
      </Flex>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  extra: {
    position: 'absolute',
    top: DAY_WIDTH + px(2),
    left: 0,
    right: 0,
  },
});

export default React.memo(Period);
