import React from 'react';
import { StatusBar } from 'react-native';
import { Theme, useTheme } from '@td-design/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container: React.FC = ({ children }) => {
  const theme = useTheme<Theme>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.app_background }} edges={['bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent />
      {children}
    </SafeAreaView>
  );
};

export default Container;
