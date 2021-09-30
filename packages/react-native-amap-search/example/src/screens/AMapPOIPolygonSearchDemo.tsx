import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import { Text } from '@td-design/react-native';
import Container from '../components/Container';
import { useAMapSearch } from 'react-native-amap-search';

export default () => {
  const { aMapPOIPolygonSearch, data } = useAMapSearch();

  useEffect(() => {
    const points = [
      {
        latitude: 39.990459,
        longitude: 116.481476,
      },
      {
        latitude: 39.890459,
        longitude: 116.581476,
      },
    ];
    const params = { points, keywords: '电影院' };
    aMapPOIPolygonSearch?.(params);
  }, [aMapPOIPolygonSearch]);

  return (
    <Container>
      <ScrollView style={{ flex: 1 }}>
        {data?.map(item => {
          return <Text key={item.uid}>{item.name}</Text>;
        })}
      </ScrollView>
    </Container>
  );
};
