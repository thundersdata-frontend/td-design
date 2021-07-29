import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { useAMapSearch } from 'react-native-amap-search';

export default function App() {
  const { init, aMapPOIAroundSearch, data } = useAMapSearch();
  console.log(data, 'data');
  React.useEffect(() => {
    init();

    aMapPOIAroundSearch({
      latitude: 39.990459,
      longitude: 116.481476,
      keywords: '充电桩',
    });
  }, []);

  return (
    <View style={styles.container}>
      {data?.map((item) => {
        return (
          <View key={item.uid}>
            <Text>{item.name}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
