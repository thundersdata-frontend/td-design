import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@td-design/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ContainerProps {
  hasHeader?: boolean;
}

const Container: React.FC<ContainerProps> = ({ hasHeader = true, children }) => {
  const theme = useTheme<Theme>();
  const height = useHeaderHeight();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white, paddingTop: hasHeader ? height : insets.top }}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent />
      {children}
    </SafeAreaView>
  );
};

export default Container;
