import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider, Box, Text } from '@td-design/react-native';

const App = () => {
  return (
    <SafeAreaView>
      <ThemeProvider>
        <Box>
          <Text variant="body">123</Text>
        </Box>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;
