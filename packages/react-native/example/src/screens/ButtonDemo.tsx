import React from 'react';
import { Button, WhiteSpace } from '@td-design/react-native';
import { ScrollView } from 'react-native';

import Container from '../components/Container';

export default () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Button title="按钮" onPress={() => console.log(4)} width={200} />
        <WhiteSpace />
        <Button disabled title="按钮" width="70%" onPress={() => console.log(4)} />
        <WhiteSpace />
        <Button title="按钮" loading onPress={() => console.log(4)} />
        <WhiteSpace />
        <Button title="圆按钮" borderRadius={20} onPress={() => console.log(4)} />
        <WhiteSpace />
        <Button type="secondary" loading title="线框样式" onPress={() => console.log(4)} />
        <WhiteSpace />
        <Button title="text 样式" type="text" onPress={() => console.log(4)} />
        <WhiteSpace />
        <Button disabled type="secondary" title="线框禁用" onPress={() => console.log(10)} />
        <WhiteSpace />
        <Button disabled title="text禁用" type="text" onPress={() => console.log(11)} />
        <WhiteSpace />
      </ScrollView>
    </Container>
  );
};
