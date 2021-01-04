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
          <Button title="CheckableDemo" onPress={() => handlePress('CheckableDemo')} />
          <Button title="ToastDemo" onPress={() => handlePress('ToastDemo')} />
          <Button title="SwiperDemo" onPress={() => handlePress('SwiperDemo')} />
          <Button title="FloatButtonDemo" onPress={() => handlePress('FloatButtonDemo')} />
          <Button title="CollapseTextDemo" onPress={() => handlePress('CollapseTextDemo')} />
          <Button title="AutoCompleteDemo" onPress={() => handlePress('AutoCompleteDemo')} />
          <Button title="SwipeRowDemo" onPress={() => handlePress('SwipeRowDemo')} />
          <Button title="TableDemo" onPress={() => handlePress('TableDemo')} />
          <Button title="FlowDemo" onPress={() => handlePress('FlowDemo')} />
          <Button title="NumberKeyboardDemo" onPress={() => handlePress('NumberKeyboardDemo')} />
          <Button title="PullRefreshDemo" onPress={() => handlePress('PullRefreshDemo')} />
          <Button title="WhiteSpaceDemo" onPress={() => handlePress('WhiteSpaceDemo')} />
          <Button title="ButtonGroupDemo" onPress={() => handlePress('ButtonGroupDemo')} />
          <Button title="WingBlankDemo" onPress={() => handlePress('WingBlankDemo')} />
          <Button title="BoxDemo" onPress={() => handlePress('BoxDemo')} />
          <Button title="TextDemo" onPress={() => handlePress('TextDemo')} />
          <Button title="PaginationDemo" onPress={() => handlePress('PaginationDemo')} />
          <Button title="PasswordDemo" onPress={() => handlePress('PasswordDemo')} />
          <Button title="TimeLineDemo" onPress={() => handlePress('TimeLineDemo')} />
          <Button title="CalendarDemo" onPress={() => handlePress('CalendarDemo')} />
          <Button title="CountDownDemo" onPress={() => handlePress('CountDownDemo')} />
        </Flex>
      </ScrollView>
    </Container>
  );
};
