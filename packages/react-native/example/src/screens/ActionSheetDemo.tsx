import React, { useState } from 'react';
import { ActionSheet } from '@td-design/react-native';
import { Button, Text } from 'react-native';
import Container from '../components/Container';

export default function ActionSheetDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <Button title="显示" onPress={() => setVisible(true)} />
      <ActionSheet
        data={[
          { text: '操作1', onPress: () => console.log(1) },
          { text: '操作2', onPress: () => console.log(2) },
          { text: '操作3', onPress: () => console.log(3), render: (text, type) => <Text>{text}</Text> },
          { text: '操作4', onPress: () => console.log(4), type: 'danger' },
        ]}
        onCancel={() => setVisible(false)}
        visible={visible}
      />
    </Container>
  );
}
