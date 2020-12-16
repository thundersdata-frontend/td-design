import React, { useMemo } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Color from 'color';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { px } from '../helper';
import Flex from '../flex';
import { PeriodProps } from './type';

const WIDTH = px(34);
const HEIGHT = px(54);

const Period: React.FC<PeriodProps> = ({ state, date, marking, onPress, children }) => {
  const { selected, disabled, startingDay, endingDay, extra } = marking;

  const theme = useTheme<Theme>();
  const { fontFamily, fontSize } = theme.textVariants.primaryNumber;

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
    <TouchableOpacity onPress={onDayPress} style={{ flex: 1, height: HEIGHT }}>
      <Flex justifyContent="center" style={{ width: '100%', height: WIDTH }}>
        {fillers}
        <Flex
          justifyContent="center"
          style={[
            { width: WIDTH, height: WIDTH },
            selected && { borderRadius: theme.borderRadii.base },
            selected &&
              (startingDay || endingDay) && {
                backgroundColor: primaryColor,
              },
          ]}
        >
          <Text
            style={[
              { fontFamily, fontSize, color: theme.colors.black },
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
        {extra}
      </Flex>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fillBlock: {
    position: 'absolute',
    height: WIDTH,
    left: 0,
    right: 0,
  },
  fillItem: {
    height: WIDTH,
    flex: 1,
  },
  extra: {
    position: 'absolute',
    top: WIDTH + 2,
    left: 0,
    right: 0,
  },
});

export default React.memo(Period);
