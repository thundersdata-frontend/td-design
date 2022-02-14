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
        <Button title="FormDemo" onPress={() => handlePress('FormDemo')} />
        <Button title="NormalPickerDemo" onPress={() => handlePress('NormalPickerDemo')} />
        <Button title="CascadePickerDemo" onPress={() => handlePress('CascadePickerDemo')} />
        <Button title="PickerItemDemo" onPress={() => handlePress('PickerItemDemo')} />
        <Button title="DatePickerDemo" onPress={() => handlePress('DatePickerDemo')} />
        <Button title="DatePickerModalDemo" onPress={() => handlePress('DatePickerModalDemo')} />
        <Button title="DatePickerInputDemo" onPress={() => handlePress('DatePickerInputDemo')} />
      </ScrollView>
    </Container>
  );
};
