import React from 'react';
import { Flex, Button } from '@td-design/react-native';
import { ScrollView } from 'react-native';
import Container from '../components/Container';

export default props => {
  const { navigation } = props;

  const handlePress = (name: string) => {
    navigation.navigate(name);
  };

  return (
    <Container>
      <ScrollView>
        <Flex flexWrap="wrap">
          <Button title="TabsDemo" onPress={() => handlePress('TabsDemo')} />
          <Button title="ModalPickerDemo" onPress={() => handlePress('ModalPickerDemo')} />
          <Button title="ModalAlertDemo" onPress={() => handlePress('ModalAlertDemo')} />
          <Button title="ProgressDemo" onPress={() => handlePress('ProgressDemo')} />
          <Button title="ModalPromptDemo" onPress={() => handlePress('ModalPromptDemo')} />
          <Button title="ModalTipDemo" onPress={() => handlePress('ModalTipDemo')} />
          <Button title="StepperDemo" onPress={() => handlePress('StepperDemo')} />
          <Button title="DarkThemeDemo" onPress={() => handlePress('DarkThemeDemo')} />
          <Button title="ButtonDemo" onPress={() => handlePress('ButtonDemo')} />
          <Button title="SwitchDemo" onPress={() => handlePress('SwitchDemo')} />
          <Button title="InputDemo" onPress={() => handlePress('InputDemo')} />
          <Button title="ActionSheetDemo" onPress={() => handlePress('ActionSheetDemo')} />
          <Button title="CardDemo" onPress={() => handlePress('CardDemo')} />
          <Button title="BadgeDemo" onPress={() => handlePress('BadgeDemo')} />
          <Button title="AccordionDemo" onPress={() => handlePress('AccordionDemo')} />
          <Button title="ModalDemo" onPress={() => handlePress('ModalDemo')} />
          <Button title="IconDemo" onPress={() => handlePress('IconDemo')} />
          <Button title="DividerDemo" onPress={() => handlePress('DividerDemo')} />
          <Button title="ImagePickerDemo" onPress={() => handlePress('ImagePickerDemo')} />
          <Button title="TagDemo" onPress={() => handlePress('TagDemo')} />
          <Button title="ModalDatePickerDemo" onPress={() => handlePress('ModalDatePickerDemo')} />
          <Button title="HeaderDemo" onPress={() => handlePress('HeaderDemo')} />
          <Button title="SearchBarDemo" onPress={() => handlePress('SearchBarDemo')} />
          <Button title="SliderDemo" onPress={() => handlePress('SliderDemo')} />
          <Button title="ImageDemo" onPress={() => handlePress('ImageDemo')} />
          <Button title="ListItemDemo" onPress={() => handlePress('ListItemDemo')} />
          <Button title="AvatarDemo" onPress={() => handlePress('AvatarDemo')} />
          <Button title="RatingDemo" onPress={() => handlePress('RatingDemo')} />
          <Button title="ShareDemo" onPress={() => handlePress('ShareDemo')} />
          <Button title="EmptyDemo" onPress={() => handlePress('EmptyDemo')} />
          <Button title="NoticeBarDemo" onPress={() => handlePress('NoticeBarDemo')} />
        </Flex>
      </ScrollView>
    </Container>
  );
};
