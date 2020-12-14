import React from 'react';
import Container from '../components/Container';
import { Calendar, Theme } from '@td-design/react-native';
import { useTheme } from '@shopify/restyle';

export default () => {
  const theme = useTheme<Theme>();

  return (
    <Container>
      <Calendar
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
      />
    </Container>
  );
};
