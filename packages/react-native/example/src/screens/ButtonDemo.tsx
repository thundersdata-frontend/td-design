import React from 'react';
import { Button, WhiteSpace, Flex, Theme } from '@td-design/react-native';
import { useTheme } from '@shopify/restyle';
import { Alert, ScrollView } from 'react-native';

import Container from '../components/Container';

const { WIDTH } = Button;
export default () => {
  const theme = useTheme<Theme>();
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* <Button title="大按钮" onPress={() => Alert.alert('hi, button')} />
        <WhiteSpace /> */}
        {/* <Button title="中按钮" width={WIDTH.MIDDLE} onPress={() => console.log(2)} />
        <WhiteSpace /> */}
        {/* <Button title="小按钮" width={WIDTH.SMALL} loading onPress={() => Alert.alert('hi, button')} />
        <WhiteSpace /> */}
        {/* <Button title="圆按钮" shape="round" disabled onPress={() => console.log(4)} />
        <WhiteSpace /> */}
        {/* <Button type="secondary" title="线框样式" onPress={() => Alert.alert('hi, button')} />
        <WhiteSpace /> */}
        {/* <Button title="link 样式" width={WIDTH.SMALL} type="link" onPress={() => Alert.alert('hi, button')} />
        <WhiteSpace />
        <Button title="text 样式" type="text" onPress={() => Alert.alert('hi, button')} />
        <WhiteSpace /> */}
        {/* <Button
          title="ripple 样式"
          ripple
          onPress={() => {
            console.log(8);
          }}
        />
        <WhiteSpace /> */}
        {/* <Button disabled title="primary 禁用" onPress={() => console.log(9)} />
        <WhiteSpace /> */}
        {/* <Button disabled width={WIDTH.SMALL} type="secondary" title="线框禁用" onPress={() => console.log(10)} />
        <WhiteSpace /> */}
        {/* <Button disabled title="text禁用" type="text" onPress={() => console.log(11)} />
        <WhiteSpace /> */}
        {/* <Button disabled title="link禁用" type="link" onPress={() => console.log(12)} />
        <WhiteSpace /> */}
        {/* <Button
          title="背景渐变"
          type="primary"
          linearOptions={{ colors: [theme.colors.secondaryColor, theme.colors.primaryColor] }}
          onPress={() => Alert.alert('hi, button')}
        />
        <WhiteSpace /> */}
        {/* <Button
          title="自定义渐变"
          disabled
          width={'75%'}
          shape="round"
          onPress={() => Alert.alert('hi, button')}
          linearOptions={{
            start: { x: 1, y: 0 },
            end: { x: 0, y: 1 },
            colors: ['#F49E81', '#FFDD94'],
          }}
        />
        <WhiteSpace /> */}
        <Button
          disabled
          title="背景渐变禁用"
          linearOptions={{
            colors: [theme.colors.secondaryColor, theme.colors.primaryColor],
          }}
          onPress={() => Alert.alert('hi, button')}
        />
        <WhiteSpace />
        {/* <Button title="loading 按钮" loading type="primary" onPress={() => console.log(16)} />
        <WhiteSpace /> */}
        {/* <Button title="线框 loading" type="text" loading onPress={() => console.log(2)} />
        <WhiteSpace /> */}
        {/* <Button title="link loading" type="link" loading onPress={() => console.log(2)} />
        <WhiteSpace /> */}
      </ScrollView>
    </Container>
  );
};
