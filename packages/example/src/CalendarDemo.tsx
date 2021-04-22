import React from 'react';
import Container from './components/Container';
import Calendar, { CalendarList, Agenda } from '@td-design/react-native-calendar';

export default () => {
  return (
    <Container>
      {/* 基础Calendar */}
      {/* <Calendar /> */}

      {/* 配置markedDates */}
      {/* <Calendar
        markedDates={{
          '2020-12-03': { disabled: true },
          '2020-12-04': { disabled: true, dotColor: '#7DC455' },
          '2020-12-11': { dotColor: theme.colors.primary, selected: true },
          '2020-12-13': { dotColor: theme.colors.primary, selected: true, selectedColor: '#7DC455' },
          '2020-12-17': { dotColor: '#7DC455', textColor: 'red' },
          '2020-12-25': { dotColor: '#7DC455' },
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
          '2020-12-03': {
            startingDay: true,
            selected: true,
            extra: '起',
          },
          '2020-12-04': { selected: true },
          '2020-12-05': { selected: true },
          '2020-12-06': { selected: true },
          '2020-12-07': { selected: true },
          '2020-12-08': { selected: true },
          '2020-12-09': { selected: true },
          '2020-12-10': { selected: true },
          '2020-12-11': { selected: true },
          '2020-12-12': { selected: true },
          '2020-12-13': { selected: true },
          '2020-12-14': { selected: true },
          '2020-12-15': {
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
