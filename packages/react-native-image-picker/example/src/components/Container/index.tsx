import React from 'react';
import { StatusBar } from 'react-native';
import { Theme } from '@td-design/react-native';
import { useTheme } from '@shopify/restyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeAtom } from '../../atom';
import { useAtomValue } from 'jotai/utils';

const Container: React.FC<{ hasHeader?: boolean; children: React.ReactElement }> = ({ hasHeader = true, children }) => {
  const theme = useTheme<Theme>();
  const themeAtomValue = useAtomValue(themeAtom);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeAtomValue === 'dark' ? theme.colors.black : theme.colors.white,
      }}
      edges={hasHeader ? ['bottom'] : undefined}
    >
      <StatusBar
        barStyle={themeAtomValue === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />
      {children}
    </SafeAreaView>
  );
};

export default Container;
