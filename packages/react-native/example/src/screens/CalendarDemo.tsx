import React from 'react';
import { useTheme } from '@shopify/restyle';
import { Calendar, CalendarList, Agenda, Theme } from '@td-design/react-native';
import Container from '../components/Container';

export default () => {
  const theme = useTheme<Theme>();
  return (
    <Container>
      {/* 基础Calendar */}
      {/* <Calendar /> */}

      {/* 配置markedDates */}
      {/* <Calendar
        markedDates={{
          '2021-05-03': { disabled: true },
          '2021-05-04': { disabled: true, dotColor: '#7DC455' },
          '2021-05-11': { dotColor: theme.colors.primary200, selected: true },
          '2021-05-13': { dotColor: theme.colors.primary200, selected: true, selectedColor: '#7DC455' },
          '2021-05-17': { dotColor: '#7DC455', textColor: 'red' },
          '2021-05-25': { dotColor: '#7DC455' },
        }}
        onDayPress={date => console.log(date, 'onDayPress')}
        onMonthChange={date => console.log(date, 'onMonthChange')}
      /> */}

      {/* 配置 firstDay */}
      {/* <Calendar firstDay={1} /> */}

      {/* 配置 hideExtraDays */}
      {/* <Calendar hideExtraDays /> */}

      {/* 配置 showSixWeeks */}
      {/* <Calendar showSixWeeks /> */}

      {/* 配置minDate和maxDate */}
      {/* <Calendar minDate="2021-03-25" maxDate="2021-04-06" /> */}

      {/* CalendarList */}
      {/* <CalendarList
        markingType="period"
        markedDates={{
          '2021-05-23': {
            startingDay: true,
            selected: true,
            extra: '起',
          },
          '2021-05-24': { selected: true },
          '2021-05-25': { selected: true },
          '2021-05-26': { selected: true },
          '2021-05-27': { selected: true },
          '2021-05-28': { selected: true },
          '2021-05-29': { selected: true },
          '2021-05-30': { selected: true },
          '2021-05-31': {
            endingDay: true,
            selected: true,
            extra: '止',
          },
        }}
      /> */}

      {/* Agenda */}
      <Agenda
        data={[
          { time: '09:00', title: '上班打卡' },
          { time: '12:00', title: '吃午饭啦' },
        ]}
        keyExtractor={(_, index) => `${index}`}
        markedDates={{
          '2021-04-22': { dotColor: 'green' },
          '2021-04-21': { dotColor: 'red' },
        }}
      />
    </Container>
  );
};
