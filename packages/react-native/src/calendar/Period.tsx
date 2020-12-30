import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Color from 'color';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { px } from '../helper';
import Flex from '../flex';
import Text from '../text';
import { PeriodProps } from './type';
import { DAY_WIDTH } from './constant';

const HEIGHT = DAY_WIDTH + px(20);

const Period: React.FC<PeriodProps> = ({ state, date, marking, onPress, children }) => {
  const { selected, disabled, startingDay, endingDay, extra } = marking;

  const theme = useTheme<Theme>();
  const { fontSize } = theme.textVariants.primaryNumber;

  const primaryColor = theme.colors.primaryColor;
  const color = new Color(primaryColor);
  const lightColor = color.lighten(0.8).hex();

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

    const filledStyle = {
      backgroundColor: theme.colors.white,
    };
    const notFilledStyle = {
      backgroundColor: lightColor,
    };

    if (!selected) return null;
    return (
      <Flex style={[styles.fillBlock, !startingDay && !endingDay && notFilledStyle]}>
        <View style={[styles.fillItem, isStart ? filledStyle : notFilledStyle]} />
        <View style={[styles.fillItem, isEnd ? filledStyle : notFilledStyle]} />
      </Flex>
    );
  }, [selected, startingDay, endingDay, theme.colors.white, lightColor]);

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
                backgroundColor: primaryColor,
              },
          ]}
        >
          <Text
            style={[
              { fontSize, color: theme.colors.black },
              selected && { color: theme.colors.white },
              isDisabled && { color: theme.colors.closedTagColor },
              isToday && { color: primaryColor },
            ]}
          >
            {String(children)}
          </Text>
        </Flex>
      </Flex>
      <Flex style={styles.extra} justifyContent="center">
        {typeof extra === 'string' ? (
          <Text fontSize={px(10)} color="primaryColor">
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
