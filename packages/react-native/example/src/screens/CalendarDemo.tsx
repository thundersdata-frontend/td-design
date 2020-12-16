import React from 'react';
import Container from '../components/Container';
import { Calendar, Theme, Text, helpers } from '@td-design/react-native';
import { useTheme } from '@shopify/restyle';

const { CalendarList } = Calendar;
const { px } = helpers;

export default () => {
  const theme = useTheme<Theme>();

  return (
    <Container>
      {/* <Calendar
        hideExtraDays={false}
        firstDay={1}
        markingType="dot"
        markedDates={{
          '2020-12-03': { disabled: true },
          '2020-12-04': { disabled: true, dotColor: '#7DC455' },
          '2020-12-11': { dotColor: theme.colors.primaryColor, selected: true },
          '2020-12-13': { dotColor: theme.colors.primaryColor, selected: true, selectedColor: '#7DC455' },
          '2020-12-17': { dotColor: '#7DC455', textColor: 'red' },
          '2020-12-25': { dotColor: '#7DC455' },
        }}
        onDayPress={date => console.log(date, 'onDayPress')}
        onMonthChange={date => console.log(date, 'onMonthChange')}
      /> */}
      <CalendarList
        markingType="period"
        markedDates={{
          '2020-12-03': {
            startingDay: true,
            selected: true,
            extra: (
              <Text fontSize={px(10)} color="primaryColor">
                起
              </Text>
            ),
          },
          '2020-12-04': { selected: true },
          '2020-12-05': { selected: true },
          '2020-12-06': { selected: true },
          '2020-12-07': { selected: true },
          '2020-12-08': { selected: true },
          '2020-12-09': { selected: true },
          '2020-12-10': {
            endingDay: true,
            selected: true,
            extra: (
              <Text fontSize={px(10)} color="primaryColor">
                止
              </Text>
            ),
          },
        }}
      />
    </Container>
  );
};
