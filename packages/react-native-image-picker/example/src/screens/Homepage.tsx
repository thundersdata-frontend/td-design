import React from 'react';
import { Button } from '@td-design/react-native';
import { ScrollView } from 'react-native';
import Container from '../components/Container';
import { ParamList, ScreenProps } from '../common';

export default (props: ScreenProps) => {
  const { navigation } = props;

  const handlePress = (name: keyof ParamList) => {
    navigation.navigate(name);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Button title="ImagePickerDemo" onPress={() => handlePress('ImagePickerDemo')} />
        <Button title="ImagePickerFormDemo" onPress={() => handlePress('ImagePickerFormDemo')} />
      </ScrollView>
    </Container>
  );
};
