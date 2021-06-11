import React from 'react';
import {Text, View} from 'react-native';
import {CustomText, DefaultHeader} from '@td-design/react-native-refreshview';

export default function App() {
  return (
    <View>
      <CustomText />
      <DefaultHeader primaryColor="#0189fb" accentColor="#ffcc03" />
    </View>
  );
}
