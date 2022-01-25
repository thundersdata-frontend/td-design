import React, { useState } from 'react';
import { Button, WhiteSpace } from '@td-design/react-native';
import { Alert, ScrollView } from 'react-native';

import Container from '../components/Container';

export default () => {
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      {/* <Button title="按钮" loading={loading} onPress={() => Alert.alert('hello, Button')} /> */}
      <WhiteSpace />
      {/* <Button title="按钮" type="secondary" onPress={() => Alert.alert('hello, Button')} />
      <WhiteSpace /> */}
      {/* <Button disabled title="按钮" onPress={() => Alert.alert('hello, Button')} />
      <WhiteSpace /> */}
      <Button title="按钮" borderRadius={20} onPress={() => Alert.alert('hello, Button')} />
      <WhiteSpace />
      {/* <Button title="圆按钮" borderRadius={20} onPress={() => Alert.alert('hello, Button')} />
        <WhiteSpace />
        <Button type="primary" loading title="线框样式" onPress={() => Alert.alert('hello, Button')} />
        <WhiteSpace />
        <Button type="secondary" loading title="线框样式" onPress={() => Alert.alert('hello, Button')} />
        <WhiteSpace />
        <Button disabled type="secondary" title="线框禁用" onPress={() => console.log(10)} />
        <WhiteSpace /> */}
    </Container>
  );
};
