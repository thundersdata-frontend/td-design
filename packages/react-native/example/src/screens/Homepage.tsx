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
          <Button title="PullRefreshDemo" onPress={() => handlePress('PullRefreshDemo')} />
          <Button title="IndicatorDemo" onPress={() => handlePress('IndicatorDemo')} />
          <Button title="AccordionDemo" onPress={() => handlePress('AccordionDemo')} />
          <Button title="ActionSheetDemo" onPress={() => handlePress('ActionSheetDemo')} />
          <Button title="AvatarDemo" onPress={() => handlePress('AvatarDemo')} />
          <Button title="BadgeDemo" onPress={() => handlePress('BadgeDemo')} />
          <Button title="ButtonDemo" onPress={() => handlePress('ButtonDemo')} />
          <Button title="ButtonGroupDemo" onPress={() => handlePress('ButtonGroupDemo')} />
          <Button title="CardDemo" onPress={() => handlePress('CardDemo')} />
          <Button title="CheckableDemo" onPress={() => handlePress('CheckableDemo')} />
          <Button title="CollapseTextDemo" onPress={() => handlePress('CollapseTextDemo')} />
          <Button title="CountDownDemo" onPress={() => handlePress('CountDownDemo')} />
          <Button title="DividerDemo" onPress={() => handlePress('DividerDemo')} />
          <Button title="DatePickerDemo" onPress={() => handlePress('ModalDatePickerDemo')} />
          <Button title="EmptyDemo" onPress={() => handlePress('EmptyDemo')} />
          <Button title="FloatButtonDemo" onPress={() => handlePress('FloatButtonDemo')} />
          <Button title="FlowDemo" onPress={() => handlePress('FlowDemo')} />
          <Button title="IconDemo" onPress={() => handlePress('IconDemo')} />
          <Button title="ImageDemo" onPress={() => handlePress('ImageDemo')} />
          <Button title="InputDemo" onPress={() => handlePress('InputDemo')} />
          <Button title="HeaderDemo" onPress={() => handlePress('HeaderDemo')} />
          <Button title="ListItemDemo" onPress={() => handlePress('ListItemDemo')} />
          <Button title="MenuDemo" onPress={() => handlePress('MenuDemo')} />
          <Button title="ModalAlertDemo" onPress={() => handlePress('ModalAlertDemo')} />
          <Button title="ModalConfirmDemo" onPress={() => handlePress('ModalConfirmDemo')} />
          <Button title="ModalPromptDemo" onPress={() => handlePress('ModalPromptDemo')} />
          <Button title="ModalTipDemo" onPress={() => handlePress('ModalTipDemo')} />
          <Button title="ModalDemo" onPress={() => handlePress('ModalDemo')} />
          <Button title="NoticeBarDemo" onPress={() => handlePress('NoticeBarDemo')} />
          <Button title="NumberKeyboardDemo" onPress={() => handlePress('NumberKeyboardDemo')} />
          <Button title="PaginationDemo" onPress={() => handlePress('PaginationDemo')} />
          <Button title="ModalPickerDemo" onPress={() => handlePress('ModalPickerDemo')} />
          <Button title="ProgressDemo" onPress={() => handlePress('ProgressDemo')} />
          <Button title="SearchBarDemo" onPress={() => handlePress('SearchBarDemo')} />
          <Button title="SliderDemo" onPress={() => handlePress('SliderDemo')} />
          <Button title="StepperDemo" onPress={() => handlePress('StepperDemo')} />
          <Button title="SwiperDemo" onPress={() => handlePress('SwiperDemo')} />
          <Button title="SwipeRowDemo" onPress={() => handlePress('SwipeRowDemo')} />
          <Button title="SwitchDemo" onPress={() => handlePress('SwitchDemo')} />
          <Button title="TableDemo" onPress={() => handlePress('TableDemo')} />
          <Button title="TimeLineDemo" onPress={() => handlePress('TimeLineDemo')} />
          <Button title="ToastDemo" onPress={() => handlePress('ToastDemo')} />
          <Button title="TreeDemo" onPress={() => handlePress('TreeDemo')} />
          <Button title="TagDemo" onPress={() => handlePress('TagDemo')} />
          <Button title="TooltipDemo" onPress={() => handlePress('TooltipDemo')} />
        </Flex>
      </ScrollView>
    </Container>
  );
};
