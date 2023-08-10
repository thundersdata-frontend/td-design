import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Flex, helpers, Text } from '@td-design/react-native';

import { DAY_WIDTH } from '../../constant';
import { PeriodProps } from '../../type';
import usePeriod from './usePeriod';

const { px } = helpers;

const HEIGHT = DAY_WIDTH + px(20);

const Period: React.FC<PeriodProps> = ({ state, date, marking, onPress, children, activeOpacity }) => {
  const { theme, onDayPress, filters, selected, startingDay, endingDay, isDisabled, isToday, extra } = usePeriod({
    state,
    date,
    marking,
    onPress,
  });

  const styles = StyleSheet.create({
    container: { flex: 1, height: HEIGHT },
    wrapper: { width: DAY_WIDTH, height: DAY_WIDTH },
    selected: { borderRadius: theme.borderRadii.x1 },
    bg: {
      backgroundColor: theme.colors.primary200,
    },
    extra: {
      position: 'absolute',
      top: DAY_WIDTH + px(2),
      left: 0,
      right: 0,
    },
  });

  let color: any = 'gray500';
  if (selected && (startingDay || endingDay)) {
    color = 'white';
  } else if (isToday) {
    color = 'primary200';
  } else if (isDisabled) {
    color = 'gray200';
  }

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onDayPress} style={styles.container}>
      <Flex justifyContent="center" style={{ width: '100%', height: DAY_WIDTH }}>
        {filters}
        <Flex
          justifyContent="center"
          style={StyleSheet.flatten([
            styles.wrapper,
            selected && styles.selected,
            selected && (startingDay || endingDay) && styles.bg,
          ])}
        >
          <Text variant="p1" color={color}>
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

export default React.memo(Period);
