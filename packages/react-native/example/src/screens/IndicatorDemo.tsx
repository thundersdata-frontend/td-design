import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BallIndicator, UIActivityIndicator } from '@td-design/react-native';

export default function IndicatorDemo() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style={styles.row}>
        <BallIndicator color="#0189fb" />
      </View> */}
      <View style={styles.row}>
        <UIActivityIndicator color="#ff0000" size={50} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
