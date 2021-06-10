import React from 'react';
import {FlatListExample} from './src/FlatListExample';
import {FlatListExample2} from './src/FlatListExample2';
import {Text, View} from 'react-native';

const App = () => {
  return (
    <View style={{flex: 1}}>
      {/* <FlatListExample /> */}
      <FlatListExample2 />
      {/* <ScrollViewExample /> */}
      <View>
        <Text>123</Text>
      </View>
    </View>
  );
};

export default App;
