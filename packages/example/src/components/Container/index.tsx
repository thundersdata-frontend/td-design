import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container: React.FC = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent />
      {children}
    </SafeAreaView>
  );
};

export default Container;
