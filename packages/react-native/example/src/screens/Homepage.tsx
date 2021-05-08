import React from 'react';
import { Flex, Button } from '@td-design/react-native';
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
        <Flex flexWrap="wrap">
          <Button title="CalendarDemo" onPress={() => handlePress('CalendarDemo')} />
          <Button title="PasswordDemo" onPress={() => handlePress('PasswordDemo')} />
          <Button title="RatingDemo" onPress={() => handlePress('RatingDemo')} />
          <Button title="TabsDemo" onPress={() => handlePress('TabsDemo')} />
          <Button title="AccordionDemo" onPress={() => handlePress('AccordionDemo')} />
          <Button title="MenuDemo" onPress={() => handlePress('MenuDemo')} />
          <Button title="CollapseTextDemo" onPress={() => handlePress('CollapseTextDemo')} />
          <Button title="FloatButtonDemo" onPress={() => handlePress('FloatButtonDemo')} />
          <Button title="HeaderDemo" onPress={() => handlePress('HeaderDemo')} />
          <Button title="NoticeBarDemo" onPress={() => handlePress('NoticeBarDemo')} />
          <Button title="ProgressDemo" onPress={() => handlePress('ProgressDemo')} />
          <Button title="SliderDemo" onPress={() => handlePress('SliderDemo')} />
          <Button title="SwipeRowDemo" onPress={() => handlePress('SwipeRowDemo')} />
          <Button title="SwitchDemo" onPress={() => handlePress('SwitchDemo')} />
          <Button title="ToastDemo" onPress={() => handlePress('ToastDemo')} />
          <Button title="ModalPickerDemo" onPress={() => handlePress('ModalPickerDemo')} />
          <Button title="ModalAlertDemo" onPress={() => handlePress('ModalAlertDemo')} />
          <Button title="ModalConfirmDemo" onPress={() => handlePress('ModalConfirmDemo')} />
          <Button title="ModalPromptDemo" onPress={() => handlePress('ModalPromptDemo')} />
          <Button title="ModalTipDemo" onPress={() => handlePress('ModalTipDemo')} />
          <Button title="StepperDemo" onPress={() => handlePress('StepperDemo')} />
          <Button title="DarkThemeDemo" onPress={() => handlePress('DarkThemeDemo')} />
          <Button title="ButtonDemo" onPress={() => handlePress('ButtonDemo')} />
          <Button title="InputDemo" onPress={() => handlePress('InputDemo')} />
          <Button title="ActionSheetDemo" onPress={() => handlePress('ActionSheetDemo')} />
          <Button title="CardDemo" onPress={() => handlePress('CardDemo')} />
          <Button title="BadgeDemo" onPress={() => handlePress('BadgeDemo')} />
          <Button title="ModalDemo" onPress={() => handlePress('ModalDemo')} />
          <Button title="IconDemo" onPress={() => handlePress('IconDemo')} />
          <Button title="DividerDemo" onPress={() => handlePress('DividerDemo')} />
          <Button title="TagDemo" onPress={() => handlePress('TagDemo')} />
          <Button title="ModalDatePickerDemo" onPress={() => handlePress('ModalDatePickerDemo')} />
          <Button title="SearchBarDemo" onPress={() => handlePress('SearchBarDemo')} />
          <Button title="ImageDemo" onPress={() => handlePress('ImageDemo')} />
          <Button title="ListItemDemo" onPress={() => handlePress('ListItemDemo')} />
          <Button title="AvatarDemo" onPress={() => handlePress('AvatarDemo')} />
          <Button title="EmptyDemo" onPress={() => handlePress('EmptyDemo')} />
          <Button title="CheckableDemo" onPress={() => handlePress('CheckableDemo')} />
          <Button title="SwiperDemo" onPress={() => handlePress('SwiperDemo')} />
          <Button title="AutoCompleteDemo" onPress={() => handlePress('AutoCompleteDemo')} />
          <Button title="TableDemo" onPress={() => handlePress('TableDemo')} />
          <Button title="FlowDemo" onPress={() => handlePress('FlowDemo')} />
          <Button title="NumberKeyboardDemo" onPress={() => handlePress('NumberKeyboardDemo')} />
          <Button title="WhiteSpaceDemo" onPress={() => handlePress('WhiteSpaceDemo')} />
          <Button title="ButtonGroupDemo" onPress={() => handlePress('ButtonGroupDemo')} />
          <Button title="WingBlankDemo" onPress={() => handlePress('WingBlankDemo')} />
          <Button title="BoxDemo" onPress={() => handlePress('BoxDemo')} />
          <Button title="TextDemo" onPress={() => handlePress('TextDemo')} />
          <Button title="PaginationDemo" onPress={() => handlePress('PaginationDemo')} />
          <Button title="TimeLineDemo" onPress={() => handlePress('TimeLineDemo')} />
          <Button title="CalendarDemo" onPress={() => handlePress('CalendarDemo')} />
          <Button title="TreeDemo" onPress={() => handlePress('TreeDemo')} />
          <Button title="CountDownDemo" onPress={() => handlePress('CountDownDemo')} />
        </Flex>
      </ScrollView>
    </Container>
  );
};
