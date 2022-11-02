import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { ParamList, ScreenProps } from '../common';
import Container from '../components/Container';

export default (props: ScreenProps) => {
  const { navigation } = props;

  const handlePress = (name: keyof ParamList) => {
    console.log('name: ', name);
    navigation.navigate(name);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TouchableOpacity onPress={() => handlePress('ImagePickerDemo')}>
          <Text>ImagePickerDemo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('ImagePickerFormDemo')}>
          <Text>ImagePickerFormDemo</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};
