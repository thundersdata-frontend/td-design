import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider, Flex, Text, Box, WhiteSpace, WingBlank } from '@td-design/react-native';
import { theme } from './theme';

const App = () => {
  return (
    <SafeAreaView>
      <ThemeProvider {...{ theme }}>
        <Flex height={200} borderWidth={1} backgroundColor="mainBackground">
          <Flex.Item borderColor="borderColor" borderWidth={1} marginRight="s">
            <Text variant="body">123</Text>
          </Flex.Item>
          <Flex.Item>
            <Box borderColor="borderColor" borderWidth={1}>
              <Text variant="body">456</Text>
            </Box>
          </Flex.Item>
        </Flex>
        <WhiteSpace size="xxl" />
        <Box borderColor="borderColor" borderWidth={1}>
          <Text>789</Text>
        </Box>
        <WhiteSpace />
        <WingBlank size="xl">
          <Box borderColor="borderColor" borderWidth={1}>
            <Text>000</Text>
          </Box>
        </WingBlank>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;
