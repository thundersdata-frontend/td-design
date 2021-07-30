import React from 'react';
import { Button } from '@td-design/react-native';
import { ScrollView } from 'react-native';
import Container from '../components/Container';
import type { ParamList, ScreenProps } from '../common';

export default (props: ScreenProps) => {
  const { navigation } = props;

  const handlePress = (name: keyof ParamList) => {
    navigation.navigate(name);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Button
          title="AMapPOIAroundSearch"
          onPress={() => handlePress('AMapPOIAroundSearch')}
        />
        <Button
          title="AMapPOIKeywordsSearch"
          onPress={() => handlePress('AMapPOIKeywordsSearch')}
        />
      </ScrollView>
    </Container>
  );
};
