import React from 'react';
import { Text, ThemeProvider } from '@td-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CalendarDemo from './CalendarDemo';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <CalendarDemo />
        {/* <Text>123123123123123123123123123123123123123123123123123</Text> */}
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
